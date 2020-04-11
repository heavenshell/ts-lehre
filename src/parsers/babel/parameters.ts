import {
  AssignmentPattern,
  Identifier,
  Node,
  ObjectPattern,
  TSParameterProperty,
  TSTypeAnnotation,
} from '@babel/types'

import { getLocation } from './helper'

export const getText = (
  lines: string[],
  start: { line: number; column: number },
  end: { line: number; column: number }
) => {
  // Slice source code between start to end.
  const line = /[A-z0-9_-]/.exec(lines[start.line])
  const indent = (line && line.index) || 0
  const types = lines.slice(start.line, end.line + 1)
  const length = types.length
  return types
    .map((t, i) => {
      if (length === 1) {
        // Signature is oneline
        return t.slice(start.column, end.column).trim()
      }
      // Slice first line
      if (i === start.line - 1) {
        return t.slice(start.column).trim()
      }

      // Slice first line
      if (i === end.line - 1) {
        return t.slice(0, end.column).trim()
      }

      return `${' '.repeat(indent)}${t.trim()}`
    })
    .join('\n')
}

const getAlias = (node: Node) => {
  switch (node.type) {
    case 'TSArrayType':
    case 'TSTypeReference':
    case 'TSUnionType':
      return ''
  }
  return 'Object'
}

export const getType = (node: Node, lines: string[]) => {
  switch (node.type) {
    case 'TSNumberKeyword':
      return { type: 'number', alias: 'number' }
    case 'TSStringKeyword':
      return { type: 'string', alias: 'string' }
    case 'TSBooleanKeyword':
      return { type: 'boolean', alias: 'boolean' }
    case 'TSVoidKeyword':
      return { type: 'void', alias: 'void' }
    case 'TSAnyKeyword':
      return { type: 'any', alias: 'any' }
    case 'ObjectExpression':
    case 'TSTypeLiteral':
    case 'TSArrayType':
    case 'TSTypeReference':
    case 'TSUnionType':
      if (node.loc) {
        const { start, end } = getLocation(node)
        const alias = getAlias(node)
        const type = getText(lines, start, end)
        return { type, alias }
      }
      return { type: '', alias: 'Object' }
    case 'TSFunctionType':
      if (node.loc) {
        const { start, end } = getLocation(node)
        const type = getText(lines, start, end)
        return { type, alias: 'Function' }
      }
      return { type: 'Function', alias: 'Function' }
    case 'TSConstructorType':
      if (node.loc) {
        const { start, end } = getLocation(node)
        const type = getText(lines, start, end)
        return { type, alias: 'Class' }
      }
      return { type: 'Function', alias: 'Function' }
    default:
      return { type: '', alias: '' }
  }
}

export const getParameter = (
  node: Identifier | AssignmentPattern | TSParameterProperty | ObjectPattern,
  lines: string[]
) => {
  const param = {
    name: '',
    default: '',
    type: '',
    alias: '',
  }

  switch (node.type) {
    case 'TSParameterProperty':
      param.name = (node.parameter as Identifier).name
      if (node.parameter.typeAnnotation) {
        const { type, alias } = getType(
          (node.parameter.typeAnnotation as TSTypeAnnotation).typeAnnotation,
          lines
        )
        param.type = type
        param.alias = alias
      }
      break
    case 'Identifier':
      param.name = node.name
      if (node.typeAnnotation) {
        const { type, alias } = getType(
          (node.typeAnnotation as TSTypeAnnotation).typeAnnotation,
          lines
        )
        param.type = type
        param.alias = alias
      }
      break
    case 'ObjectPattern':
      // const foo = ({ arg: 'foo' }) => {}
      if (node.typeAnnotation) {
        const { type, alias } = getType(
          (node.typeAnnotation as TSTypeAnnotation).typeAnnotation,
          lines
        )
        param.type = type
        param.alias = alias
      }
      break
    case 'AssignmentPattern':
      const left = node.left as Identifier
      param.name = left.name
      if (left.typeAnnotation) {
        const { type, alias } = getType(
          (left.typeAnnotation as TSTypeAnnotation).typeAnnotation,
          lines
        )
        param.type = type
        param.alias = alias
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (node.right as any).extra.raw
      param.default = value || getType(node.right, lines).type
      break
  }

  return param
}
