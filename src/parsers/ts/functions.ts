import { FunctionDeclaration, SourceFile } from 'typescript'

import { getParameter } from './parameters'

import { FunctionDocProps, ParamProps } from '../../types'

export const getFunctionDoc = (
  node: FunctionDeclaration,
  source: SourceFile
): FunctionDocProps => {
  const params: ParamProps[] = []

  const doc = {
    name: node.name ? node.name.text : '',
    type: 'function',
    start: source.getLineAndCharacterOfPosition(node.getStart(source)),
    end: source.getLineAndCharacterOfPosition(node.getEnd()),
    returnType: '',
    params,
  }
  if (node.hasOwnProperty('parameters')) {
    doc.params = node.parameters.map((n) => {
      return getParameter(n, source)
    })
  }
  if (node.hasOwnProperty('type') && node.type) {
    doc.returnType = node.type.getText(source)
  }
  return doc
}
