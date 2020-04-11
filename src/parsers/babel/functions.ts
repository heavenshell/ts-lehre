import { FunctionDeclaration, Identifier, TSTypeAnnotation } from '@babel/types'

import { getLocation } from './helper'
import { getParameter, getType } from './parameters'

import { ParamProps } from '../../types'

export const getFunctionDoc = (node: FunctionDeclaration, lines: string[]) => {
  const params: ParamProps[] = node.params.map((param) => {
    return getParameter(param as Identifier, lines)
    // switch (param.type) {
    //   case 'Identifier':
    //     return getParameter(param as Identifier, lines)
    //   case 'AssignmentPattern':
    //     const parameter = getParameter(param.left as Identifier, lines)
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const value = (param.right as any).extra.raw
    //     return {
    //       ...parameter,
    //       default: value || getType(param.right, lines).type,
    //     }
    // }
    // return { name: '', type: '', default: '', alias: '' }
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

  if (node.hasOwnProperty('returnType') && node.returnType) {
    const { type } = getType(
      (node.returnType as TSTypeAnnotation).typeAnnotation,
      lines
    )
    doc.returnType = type
  }

  return doc
}
