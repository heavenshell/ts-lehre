import {
  ArrowFunction,
  Identifier,
  ParameterDeclaration,
  NodeArray,
  SourceFile,
  VariableDeclaration,
} from 'typescript'

import { getParameter } from './parameters'

import { LineProps, ParamProps } from '../../types'

export const getVariableDoc = (
  node: VariableDeclaration,
  source: SourceFile,
  start: LineProps,
  end: LineProps
) => {
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
    node.hasOwnProperty('initializer') &&
    node.initializer &&
    node.initializer.hasOwnProperty('parameters')
  ) {
    doc.type = 'function'
    const parameters: NodeArray<ParameterDeclaration> = (node.initializer as ArrowFunction)
      .parameters
    doc.params = parameters.map(param => {
      return getParameter(param, source)
    })
    if (node.initializer.hasOwnProperty('type')) {
      const type = (node.initializer as ArrowFunction).type
      if (type) {
        doc.returnType = type.getText(source)
      }
    }
  } else {
    doc.type = 'property'
    if (node.hasOwnProperty('type') && node.type) {
      const type = (node.initializer as ArrowFunction).type
      if (type) {
        doc.returnType = type.getText(source)
      }
    }
  }
  return doc
}
