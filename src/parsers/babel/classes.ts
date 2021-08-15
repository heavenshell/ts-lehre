import {
  ClassBody,
  ClassDeclaration,
  Identifier,
  TSExpressionWithTypeArguments,
  TSTypeAnnotation,
} from '@babel/types'

import { getLocation } from './helper'
import { getParameter, getType } from './parameters'

import { FunctionDocProps, HeritageClauseProps } from '../../types'

export const getClassDoc = (node: ClassDeclaration, lines: string[]) => {
  const classBody = node.body as ClassBody
  const methods = classBody.body.map((c) => {
    const { start, end } = getLocation(c)
    const doc: FunctionDocProps = {
      name: '',
      type: '',
      start,
      end,
      returnType: '',
      params: [],
    }
    switch (c.type) {
      case 'ClassProperty':
        doc.name = (c.key as Identifier).name
        if (c.value && c.value.type === 'ArrowFunctionExpression') {
          // method with arrow function
          //
          // class Foo {
          //   method = (arg1: number): number => 1
          // }
          doc.type = 'function'
          doc.params = c.value.params.map((param) =>
            getParameter(param as Identifier, lines)
          )
          if (c.value.returnType) {
            doc.returnType = getType(
              (c.value.returnType as TSTypeAnnotation).typeAnnotation,
              lines
            ).type
          }
          break
        }
        doc.type = 'property'
        if (c.typeAnnotation) {
          doc.returnType = getType(
            (c.typeAnnotation as TSTypeAnnotation).typeAnnotation,
            lines
          ).type
        }
        break
      case 'ClassMethod':
        doc.name = (c.key as Identifier).name
        doc.type = 'function'
        doc.params = c.params.map((param) =>
          getParameter(param as Identifier, lines)
        )
        if (c.returnType) {
          doc.returnType = getType(
            (c.returnType as TSTypeAnnotation).typeAnnotation,
            lines
          ).type
        }
        break
    }

    return doc
  })

  const { start, end } = getLocation(node)
  const impls = node.implements
    ? (node.implements as TSExpressionWithTypeArguments[])
    : []

  const heritageClauses: HeritageClauseProps[] = impls.map((impl) => ({
    type: 'implements',
    value: (impl.expression as Identifier).name,
  }))

  if (node.superClass) {
    heritageClauses.push({
      type: 'extends',
      value: (node.superClass as Identifier).name,
    })
  }

  const doc = {
    name: (node.id as Identifier).name,
    type: 'class',
    start,
    end,
    methods,
    heritageClauses,
  }

  return doc
}
