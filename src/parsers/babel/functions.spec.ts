import { getFunctionDoc } from './functions'
import { getAst } from './helper'

describe('functions', () => {
  it('getFunctionDoc', () => {
    const code = `
    function foo() {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getFunctionDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 2, column: 5 },
      params: [],
      returnType: '',
    })
  })

  it('getFunctionDoc with args', () => {
    const code = `
    function foo(arg1: string, arg2: number) {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getFunctionDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 2, column: 5 },
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
    const code = `
    function foo(arg1: string, arg2: number): number {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getFunctionDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 2, column: 5 },
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

  it('getFunctionDoc with default parameter', () => {
    const code = `
    function foo(arg1: string = 'foo', arg2: number = 100): number {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getFunctionDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 2, column: 5 },
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

  it('getFunctionDoc with alias', () => {
    const code = `
    function foo(arg1: string, arg2: { foo: number }) {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getFunctionDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 2, column: 5 },
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

  it('getFunctionDoc with export', () => {
    const code = `
    export function foo(arg1: string = 'foo', arg2: number = 100): number {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const declaration = (ast.program.body[0] as any).declaration
    const actual = getFunctionDoc(declaration, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 11 },
      end: { line: 2, column: 5 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: "'foo'",
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

  it('getFunctionDoc with export default', () => {
    const code = `
    export default function foo(arg1: string = 'foo', arg2: number = 100): number {
    }
    `

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const declaration = (ast.program.body[0] as any).declaration
    const actual = getFunctionDoc(declaration, code.split('\n'))

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 1, column: 19 },
      end: { line: 2, column: 5 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: "'foo'",
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
})
