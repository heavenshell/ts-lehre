import {
  ArrowFunctionExpression,
  Identifier,
  // StringLiteral,
  TSTypeAnnotation,
  VariableDeclarator,
} from '@babel/types'

import { getLocation } from './helper'
import { getParameter, getType } from './parameters'

import { ParamProps } from '../../types'

export const getVariableDoc = (node: VariableDeclarator, lines: string[]) => {
  const init = node.init as ArrowFunctionExpression
  const params: ParamProps[] = init.params.map((param) => {
    return getParameter(param as Identifier, lines)
    // switch (param.type) {
    //   case 'Identifier':
    //     return getParameter(param as Identifier, lines)
    //   case 'AssignmentPattern':
    //     const parameter = getParameter(param.left as Identifier, lines)
    //     return {
    //       ...parameter,
    //       default:
    //         (param.right as StringLiteral).value ||
    //         getType(param.right, lines).type,
    //     }
    // }
    // return { name: '', type: '', default: '', alias: '' }
  })

  const { start, end } = getLocation(node)
  const id = node.id as Identifier
  const doc = {
    name: id ? (id.name as string) : '',
    type: 'function',
    start,
    end,
    params,
    returnType: '',
  }

  if (init.hasOwnProperty('returnType') && init.returnType) {
    const { type } = getType(
      (init.returnType as TSTypeAnnotation).typeAnnotation,
      lines
    )
    doc.returnType = type
  }
  return doc
}
