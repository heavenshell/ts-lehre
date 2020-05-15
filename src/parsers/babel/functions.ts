import { FunctionDeclaration, Identifier, TSTypeAnnotation } from '@babel/types'

import { getLocation } from './helper'
import { getParameter, getType } from './parameters'

import { has } from '../helpers'
import { ParamProps } from '../../types'

export const getFunctionDoc = (node: FunctionDeclaration, lines: string[]) => {
  const params: ParamProps[] = node.params.map((param) => {
    return getParameter(param as Identifier, lines)
  })

  const { start, end } = getLocation(node)

  const doc = {
    name: node.id ? (node.id.name as string) : '',
    type: 'function',
    start,
    end,
    params,
    returnType: '',
  }

  if (has(node, 'returnType') && node.returnType) {
    const { type } = getType(
      (node.returnType as TSTypeAnnotation).typeAnnotation,
      lines
    )
    doc.returnType = type
  }

  return doc
}
