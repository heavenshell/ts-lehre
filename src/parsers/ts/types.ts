import { TypeAliasDeclaration, SourceFile } from 'typescript'

export const getTypeDoc = (node: TypeAliasDeclaration, source: SourceFile) => {
  const start = source.getLineAndCharacterOfPosition(node.getStart(source))
  const end = source.getLineAndCharacterOfPosition(node.getEnd())

  const doc = {
    name: node.name ? node.name.text : '',
    type: 'function',
    start: { line: start.line, column: start.character },
    end: { line: end.line, column: end.character },
    methods: [],
    heritageClauses: [],
  }

  return doc
}
