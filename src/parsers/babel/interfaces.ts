import {
  Identifier,
  TSInterfaceBody,
  TSInterfaceDeclaration,
  TSExpressionWithTypeArguments,
  TSTypeAnnotation,
} from '@babel/types'

import { getLocation } from './helper'
import { getParameter, getType } from './parameters'

import { FunctionDocProps, HeritageClauseProps } from '../../types'

export const getInterfaceDoc = (
  node: TSInterfaceDeclaration,
  lines: string[]
) => {
  const interfaceBody = node.body as TSInterfaceBody
  const methods = interfaceBody.body.map((i) => {
    const { start, end } = getLocation(i)
    const doc: FunctionDocProps = {
      name: '',
      type: '',
      start,
      end,
      returnType: '',
      params: [],
    }
    switch (i.type) {
      case 'TSPropertySignature':
        doc.name = (i.key as Identifier).name
        doc.type = 'property'
        if (i.typeAnnotation) {
          doc.returnType = getType(
            (i.typeAnnotation as TSTypeAnnotation).typeAnnotation,
            lines
          ).type
        }
        break
      case 'TSMethodSignature':
        doc.name = (i.key as Identifier).name
        doc.type = 'function'
        doc.params = i.parameters.map((param) =>
          getParameter(param as Identifier, lines)
        )
        if (i.typeAnnotation) {
          doc.returnType = getType(
            (i.typeAnnotation as TSTypeAnnotation).typeAnnotation,
            lines
          ).type
        }
        break
    }

    return doc
  })

  const { start, end } = getLocation(node)
  const heritageClauses: HeritageClauseProps[] = []
  const doc = {
    name: (node.id as Identifier).name,
    type: 'interface',
    start,
    end,
    methods,
    heritageClauses,
  }
  if (node.extends) {
    const superClasses = node.extends
      ? (node.extends as TSExpressionWithTypeArguments[])
      : []

    doc.heritageClauses = superClasses.map((impl) => ({
      type: 'extends',
      value: (impl.expression as Identifier).name,
    }))
  }

  return doc
}
