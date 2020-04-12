import { parse, ParserPluginWithOptions, ParserPlugin } from '@babel/parser'
import { Comment, File, Node } from '@babel/types'

export const getLocation = (node: Node) => {
  const start = node.loc ? node.loc.start : { line: 1, column: 0 }
  const end = node.loc ? node.loc.end : { line: 1, column: 0 }

  return {
    start: { line: start.line - 1, column: start.column },
    end: { line: end.line - 1, column: end.column },
  }
}

export const getAst = (code: string, parser = 'typescript'): File => {
  const isFlow = parser === 'js'
  const lang = isFlow ? 'flow' : 'typescript'
  const plugins: ParserPlugin[] = [
    lang,
    'jsx',
    'asyncGenerators',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
  ]
  const parserPluginWithOptions: ParserPluginWithOptions = isFlow
    ? ['flow', { all: true }]
    : ['decorators', { decoratorsBeforeExport: true }]

  plugins.push(parserPluginWithOptions)

  return parse(code, {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    ranges: true,
    plugins,
  })
}

export const isCommentBlock = (comments: readonly Comment[]) => {
  const index = comments.findIndex(
    (comment: Comment) => comment.type === 'CommentBlock'
  )
  return index === -1 ? false : true
}
