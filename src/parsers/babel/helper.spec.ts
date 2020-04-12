import { getAst, getLocation, isCommentBlock } from './helper'

describe('helpers', () => {
  it('getAst', () => {
    const code = 'const foo = () => {}'
    const ast = getAst(code)
    expect(ast.type).toBe('File')
  })

  it('getLocation', () => {
    const code = 'const foo = () => {}'
    const ast = getAst(code)
    const { start, end } = getLocation(ast)
    expect(start).toEqual({ line: 0, column: 0 })
    expect(end).toEqual({ line: 0, column: 20 })
  })

  it('isCommentBlock with CommentBlock', () => {
    const code = `
    /**
     * CommentBlock.
     */
    const foo = (arg1: string) => {}`

    const ast = getAst(code)
    const comments = ast.program.body[0].leadingComments || []
    expect(isCommentBlock(comments)).toBeTruthy()
  })

  it('isCommentBlock with CommentLine', () => {
    const code = `
    // @flow
    const foo = (arg1: string) => {}`

    const ast = getAst(code)
    const comments = ast.program.body[0].leadingComments || []
    expect(isCommentBlock(comments)).toBeFalsy()
  })
})
