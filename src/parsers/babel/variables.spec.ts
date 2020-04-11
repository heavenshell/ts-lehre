import { getAst } from './helper'
import { getVariableDoc } from './variables'

describe('variables', () => {
  it('getVariableDoc', () => {
    const code = `const foo = () => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getVariableDoc(body.declarations[0], code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 0, column: 6 },
      end: { line: 0, column: 20 },
      params: [],
      returnType: '',
    })
  })

  it('getVariableDoc with args', () => {
    const code = `const foo = (arg1: string, arg2: number) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getVariableDoc(body.declarations[0], code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 0, column: 6 },
      end: { line: 0, column: 46 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: '',
          alias: 'string',
        },
        {
          name: 'arg2',
          type: 'number',
          default: '',
          alias: 'number',
        },
      ],
      returnType: '',
    })
  })

  it('getFunctionDoc with return type', () => {
    const code = `const foo = (arg1: string, arg2: number): number => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getVariableDoc(body.declarations[0], code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 0, column: 6 },
      end: { line: 0, column: 54 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: '',
          alias: 'string',
        },
        {
          name: 'arg2',
          type: 'number',
          default: '',
          alias: 'number',
        },
      ],
      returnType: 'number',
    })
  })

  it('getVariableDoc with default parameter', () => {
    const code = `const foo = (arg1: string = 'foo', arg2: number = 100): number => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getVariableDoc(body.declarations[0], code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 0, column: 6 },
      end: { line: 0, column: 68 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: `'foo'`,
          alias: 'string',
        },
        {
          name: 'arg2',
          type: 'number',
          default: '100',
          alias: 'number',
        },
      ],
      returnType: 'number',
    })
  })

  it('getVariableDoc with alias', () => {
    const code = `const foo = (arg1: string, arg2: { foo: number }) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getVariableDoc(body.declarations[0], code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 0, column: 6 },
      end: { line: 0, column: 55 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: '',
          alias: 'string',
        },
        {
          name: 'arg2',
          type: '{ foo: number }',
          default: '',
          alias: 'Object',
        },
      ],
      returnType: '',
    })
  })
})
