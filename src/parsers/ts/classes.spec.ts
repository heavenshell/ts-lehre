import {
  createSourceFile,
  ClassLikeDeclaration,
  InterfaceDeclaration,
  ScriptKind,
  ScriptTarget,
} from 'typescript'

import { getLineAndPosition } from '.'

import { getClassLikeDoc } from './classes'

describe('classes', () => {
  it('getClassDoc', () => {
    const code = `
    class Foo {
      props: Props
      constructor(arg1: string, arg2: number) {}
      render(arg1: string): string {
      }
    }`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as ClassLikeDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

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

  it('getClassDoc with private', () => {
    const code = `
    class Foo {
      private props: Props
      constructor(arg1: string, arg2: number) {}
      private render(arg1: string): string {
      }
    }`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as ClassLikeDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

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

  it('getClassDoc with arrow function', () => {
    const code = `
    class Foo {
      private props: Props
      constructor(arg1: string, arg2: number) {}
      render = (arg1: string): string => {
      }
    }`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as ClassLikeDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as ClassLikeDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as ClassLikeDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

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
      heritageClauses: [{ type: 'implements', value: 'Bar, Baz' }],
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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as ClassLikeDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

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
        { type: 'extends', value: 'Base' },
        { type: 'implements', value: 'Bar, Baz' },
      ],
    })
  })

  it('getInterfaceDoc', () => {
    const code = `
    interface Foo {
      foo(arg1: string, arg2: number): string
    }`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getClassLikeDoc(
      source.statements[0] as InterfaceDeclaration,
      source,
      getLineAndPosition(code.split('\n'))
    )

    expect(actual).toEqual({
      name: 'Foo',
      type: 'interface',
      start: { line: 1, column: 4 },
      end: { line: 3, column: 5 },
      methods: [
        {
          name: 'foo',
          type: 'function',
          start: { line: 2, column: 6 },
          end: { line: 2, column: 45 },
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
})
