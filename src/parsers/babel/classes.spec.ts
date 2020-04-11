import { getClassDoc } from './classes'
import { getAst } from './helper'

describe('classes', () => {
  it('getClassDoc', () => {
    const code = `
    class Foo {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getClassDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 4 },
      end: { line: 6, column: 5 },
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
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getClassDoc with export', () => {
    const code = `
    export class Foo {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getClassDoc(body.declaration, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 11 },
      end: { line: 6, column: 5 },
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
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getClassDoc with export default', () => {
    const code = `
    export default class Foo {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getClassDoc(body.declaration, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 19 },
      end: { line: 6, column: 5 },
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
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getClassDoc with private', () => {
    const code = `
    class Foo {
      private props: Props
      constructor(arg1: string, arg2: number) {}
      private render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getClassDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 4 },
      end: { line: 6, column: 5 },
      methods: [
        {
          name: 'props',
          type: 'property',
          start: { line: 2, column: 6 },
          end: { line: 2, column: 26 },
          params: [],
          returnType: 'Props',
        },
        {
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [],
    })
  })

  it('getClassDoc with extends', () => {
    const code = `
    class Foo extends Bar {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getClassDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 4 },
      end: { line: 6, column: 5 },
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
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [{ type: 'extends', value: 'Bar' }],
    })
  })

  it('getClassDoc with implements', () => {
    const code = `
    class Foo implements Bar, Baz {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getClassDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 4 },
      end: { line: 6, column: 5 },
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
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [
        { type: 'implements', value: 'Bar' },
        { type: 'implements', value: 'Baz' },
      ],
    })
  })

  it('getClassDoc with implements and extends', () => {
    const code = `
    class Foo extends Base implements Bar, Baz {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = getClassDoc(ast.program.body[0] as any, code.split('\n'))

    expect(actual).toEqual({
      name: 'Foo',
      type: 'class',
      start: { line: 1, column: 4 },
      end: { line: 6, column: 5 },
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
          name: 'constructor',
          type: 'function',
          start: { line: 3, column: 6 },
          end: { line: 3, column: 48 },
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
        },
        {
          name: 'render',
          type: 'function',
          start: { line: 4, column: 6 },
          end: { line: 5, column: 7 },
          params: [
            {
              name: 'arg1',
              type: 'string',
              default: '',
              alias: 'string',
            },
          ],
          returnType: 'string',
        },
      ],
      heritageClauses: [
        { type: 'implements', value: 'Bar' },
        { type: 'implements', value: 'Baz' },
        { type: 'extends', value: 'Base' },
      ],
    })
  })
})
