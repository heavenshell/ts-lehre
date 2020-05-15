import {
  BinaryExpression,
  Expression,
  FunctionExpression,
  SourceFile,
} from 'typescript'

import { getParameter } from './parameters'

import { has } from '../helpers'
import { ParamProps } from '../../types'

export const getVariableDocFromExpression = (
  node: Expression,
  source: SourceFile
) => {
  const params: ParamProps[] = []

  const start = source.getLineAndCharacterOfPosition(node.getStart(source))
  const end = source.getLineAndCharacterOfPosition(node.getEnd())

  const doc = {
    name: '',
    type: 'function',
    start: { line: start.line, column: start.character },
    end: { line: end.line, column: end.character },
    returnType: '',
    params,
  }
  const { left, right } = node as BinaryExpression
  doc.name = left.getText(source)

  const func = right as FunctionExpression
  doc.params = func.parameters.map((p) => getParameter(p, source))

  if (has(right, 'type')) {
    doc.returnType = func.type ? func.type.getText(source) : ''
  }

  return doc
}
