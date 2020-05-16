import {
  ParameterDeclaration,
  SourceFile,
  SyntaxKind,
  TypeReferenceNode,
} from 'typescript'

import { has } from '../helpers'
import { ParamProps } from '../../types'

export const getTypeFromKind = (kind: SyntaxKind) => {
  switch (kind) {
    case SyntaxKind.StringKeyword:
      return 'string'
    case SyntaxKind.NumberKeyword:
      return 'number'
    case SyntaxKind.BooleanKeyword:
      return 'boolean'
    case SyntaxKind.AnyKeyword:
      return 'any'
    case SyntaxKind.ObjectBindingPattern:
    case SyntaxKind.TypeLiteral:
      return 'Object'
    case SyntaxKind.ArrayBindingPattern:
      return 'Array'
    case SyntaxKind.FunctionType:
      return 'Function'
    case SyntaxKind.ConstructorType:
      return 'Class'
    default:
      return ''
  }
}

export const getParameter = (
  node: ParameterDeclaration,
  source: SourceFile
): ParamProps => {
  const param: ParamProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: (node.name as any).escapedText || '',
    type: '',
    default: '',
    alias: '',
  }

  if (has(node, 'type') && node.type) {
    // Type exists
    switch (node.type.kind) {
      case SyntaxKind.TypeLiteral:
        param.type = node.type.getText(source)
        param.alias = 'Object'
        break
      case SyntaxKind.TypeReference:
        param.type = (node.type as TypeReferenceNode).typeName.getText(source)
        break
      case SyntaxKind.UnionType:
      case SyntaxKind.ArrayType:
        param.type = node.type.getText(source)
        break
      default:
        param.type = node.type.getText(source)
        param.alias = getTypeFromKind(node.type.kind)
        break
    }
  }

  if (has(node, 'initializer') && node.initializer) {
    // Default keyword argument exists
    param.default = node.initializer.getText(source)
  }

  return param
}
