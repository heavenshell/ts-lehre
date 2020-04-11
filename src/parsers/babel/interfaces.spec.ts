import { getAst } from './helper'
import { getInterfaceDoc } from './interfaces'

describe('interfaces', () => {
  it('getInterfaceDoc', () => {
    const code = `
    interface Foo {
      props: Props
      foo(arg1: string, arg2: number): string
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getInterfaceDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'interface',
      start: { line: 1, column: 4 },
      end: { line: 4, column: 5 },
      methods: [
        {
          name: 'props',
          type: 'property',
          start: { line: 2, column: 6 },
          end: { line: 2, column: 18 },
          params: [],
          returnType: 'Props',
        },
        {
          name: 'foo',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 45 },
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
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getInterfaceDoc with export', () => {
    const code = `
    export interface Foo {
      props: Props
      foo(arg1: string, arg2: number): string
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getInterfaceDoc(body.declaration, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'interface',
      start: { line: 1, column: 11 },
      end: { line: 4, column: 5 },
      methods: [
        {
          name: 'props',
          type: 'property',
          start: { line: 2, column: 6 },
          end: { line: 2, column: 18 },
          params: [],
          returnType: 'Props',
        },
        {
          name: 'foo',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 45 },
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
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getInterfaceDoc with export default', () => {
    const code = `
    export default interface Foo {
      props: Props
      foo(arg1: string, arg2: number): string
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getInterfaceDoc(body.declaration, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'interface',
      start: { line: 1, column: 19 },
      end: { line: 4, column: 5 },
      methods: [
        {
          name: 'props',
          type: 'property',
          start: { line: 2, column: 6 },
          end: { line: 2, column: 18 },
          params: [],
          returnType: 'Props',
        },
        {
          name: 'foo',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 45 },
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
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getInterfaceDoc with extends', () => {
    const code = `
    interface Foo extends Bar {
      props: Props
      foo(arg1: string, arg2: number): string
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getInterfaceDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'interface',
      start: { line: 1, column: 4 },
      end: { line: 4, column: 5 },
      methods: [
        {
          name: 'props',
          type: 'property',
          start: { line: 2, column: 6 },
          end: { line: 2, column: 18 },
          params: [],
          returnType: 'Props',
        },
        {
          name: 'foo',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 45 },
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
          returnType: 'string',
        },
      ],
      heritageClauses: [{ type: 'extends', value: 'Bar' }],
    })
  })
})
