import {
  ArrowFunctionExpression,
  Identifier,
  TSTypeAnnotation,
  VariableDeclarator,
} from '@babel/types'

import { getLocation } from './helper'
import { getParameter, getType } from './parameters'

import { has } from '../helpers'
import { ParamProps } from '../../types'

export const getVariableDoc = (node: VariableDeclarator, lines: string[]) => {
  const init = node.init as ArrowFunctionExpression
  const params: ParamProps[] = init.params.map((param) => {
    return getParameter(param as Identifier, lines)
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

  if (has(init, 'returnType') && init.returnType) {
    const { type } = getType(
      (init.returnType as TSTypeAnnotation).typeAnnotation,
      lines
    )
    doc.returnType = type
  }
  return doc
}
