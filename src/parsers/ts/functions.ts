import { FunctionDeclaration, SourceFile } from 'typescript'

import { getParameter } from './parameters'

import { has } from '../helpers'
import { FunctionDocProps, ParamProps } from '../../types'

export const getFunctionDoc = (
  node: FunctionDeclaration,
  source: SourceFile
): FunctionDocProps => {
  const params: ParamProps[] = []

  const start = source.getLineAndCharacterOfPosition(node.getStart(source))
  const end = source.getLineAndCharacterOfPosition(node.getEnd())

  const doc = {
    name: node.name ? node.name.text : '',
    type: 'function',
    start: { line: start.line, column: start.character },
    end: { line: end.line, column: end.character },
    returnType: '',
    params,
  }
  if (has(node, 'parameters')) {
    doc.params = node.parameters.map((n) => {
      return getParameter(n, source)
    })
  }
  if (has(node, 'type') && node.type) {
    doc.returnType = node.type.getText(source)
  }
  return doc
}
