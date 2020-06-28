import { ArrowFunctionExpression, Node, VariableDeclarator } from '@babel/types'

import { getClassDoc } from './classes'
import { getFunctionDoc } from './functions'
import { getAst, getLocation, isCommentBlock } from './helper'
import { getInterfaceDoc } from './interfaces'
import { getVariableDoc } from './variables'

import { has } from '../helpers'
import { DocProps, ParseProps } from '../../types'

export const parse = ({ code, lines, scriptKind }: ParseProps): DocProps[] => {
  const ast = getAst(code, scriptKind)

  const docs: DocProps[] = []
  const visit = (node: Node) => {
    if (node.leadingComments && isCommentBlock(node.leadingComments)) {
      return
    }

    const start = node.loc
      ? { line: node.loc.start.line - 1, column: node.loc.start.column }
      : { line: 0, column: 0 }

    const end = node.loc
      ? { line: node.loc.end.line - 1, column: node.loc.end.column }
      : { line: 0, column: 0 }

    switch (node.type) {
      case 'VariableDeclaration':
        const declaration = node.declarations[0] as VariableDeclarator
        const init = declaration.init as ArrowFunctionExpression
        if (init && init.type === 'ArrowFunctionExpression') {
          docs.push({
            ...getVariableDoc(node.declarations[0], lines),
            start,
            end,
          })
        }
        break
      case 'TSInterfaceDeclaration':
        docs.push({ ...getInterfaceDoc(node, lines), start, end })
        break
      case 'ExportDefaultDeclaration':
        switch (node.declaration.type) {
          case 'ClassDeclaration':
            // Decorator exists
            if (has(node.declaration, 'decorators')) {
              const { start, end } = getLocation(node.declaration)
              docs.push({ ...getClassDoc(node.declaration, lines), start, end })
            } else {
              docs.push({ ...getClassDoc(node.declaration, lines), start, end })
            }
            break
          case 'FunctionDeclaration':
            docs.push({
              ...getFunctionDoc(node.declaration, lines),
              start,
              end,
            })
            break
          default:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const type = node.declaration.type as any
            if (type === 'TSInterfaceDeclaration') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const declaration = node.declaration as any
              docs.push({ ...getInterfaceDoc(declaration, lines), start, end })
            }
        }
        break
      case 'ClassDeclaration':
        docs.push({ ...getClassDoc(node, lines), start, end })
        break
      case 'ExportNamedDeclaration':
        if (!node.declaration) {
          break
        }
        switch (node.declaration.type) {
          case 'ClassDeclaration':
            // `export class Foo {}`
            if (has(node.declaration, 'decorators')) {
              // Decorator exists
              const { start, end } = getLocation(node.declaration)
              docs.push({ ...getClassDoc(node.declaration, lines), start, end })
            } else {
              docs.push({ ...getClassDoc(node.declaration, lines), start, end })
            }
            break
          case 'VariableDeclaration':
            // `export const foo = () => {}`
            const declaration = node.declaration
            const init = declaration.declarations[0].init
            if (init && init.type === 'ArrowFunctionExpression') {
              docs.push({
                ...getVariableDoc(declaration.declarations[0], lines),
                start,
                end,
              })
            }
            break
          case 'FunctionDeclaration':
            // `export function foo() {}`
            docs.push({
              ...getFunctionDoc(node.declaration, lines),
              start,
              end,
            })
            break
          case 'TSInterfaceDeclaration':
            // `export interface Foo {}`
            docs.push({
              ...getInterfaceDoc(node.declaration, lines),
              start,
              end,
            })
            break
        }
        break
      case 'FunctionDeclaration':
        docs.push({ ...getFunctionDoc(node, lines), start, end })
        break
    }
  }

  ast.program.body.forEach((stmt) => {
    visit(stmt)
  })

  return docs
}
