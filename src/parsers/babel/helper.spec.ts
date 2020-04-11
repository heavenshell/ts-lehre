import { getAst, getLocation } from './helper'

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
})
