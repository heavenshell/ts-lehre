import {
  ArrowFunction,
  Identifier,
  ParameterDeclaration,
  NodeArray,
  SourceFile,
  VariableDeclaration,
} from 'typescript'

import { getParameter } from './parameters'

import { has } from '../helpers'
import { FunctionDocProps, LineProps, ParamProps } from '../../types'

export const getVariableDoc = (
  node: VariableDeclaration,
  source: SourceFile,
  start: LineProps,
  end: LineProps
): FunctionDocProps => {
  const params: ParamProps[] = []
  const doc = {
    name: (node.name as Identifier).text,
    type: '',
    start,
    end,
    returnType: '',
    params,
  }

  if (
    has(node, 'initializer') &&
    node.initializer &&
    has(node.initializer, 'parameters')
  ) {
    doc.type = 'function'
    const parameters: NodeArray<ParameterDeclaration> = (
      node.initializer as ArrowFunction
    ).parameters
    doc.params = parameters.map((param) => {
      return getParameter(param, source)
    })
    if (has(node.initializer, 'type')) {
      const type = (node.initializer as ArrowFunction).type
      if (type) {
        doc.returnType = type.getText(source)
      }
    }
  } else {
    if (node.initializer && has(node, 'type') && node.type) {
      doc.type = 'property'
      const type = (node.initializer as ArrowFunction).type
      if (type) {
        doc.returnType = type.getText(source)
      }
    }
  }
  return doc
}
