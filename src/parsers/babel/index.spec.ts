import { parse } from './index'

describe('parsers/babel', () => {
  it('parse', () => {
    const code = `
    const foo = () => {}
    const bar = (arg1: string, arg2: number) => {}
    function baz<T>(arg1: new () => T): T {}
    interface Foo {
      foo(arg1: string, arg2: number): string
    }
    interface Props {
      onClick(event: any): void
    }
    class Bar implements Foo {
      props: Props
      foo(arg1: string, arg2: number): number {}
      private bar(arg1: number) {
        const baz = (arg1) => {}
      }
    }`
    const docs = parse({
      code,
      lines: code.split('\n'),
      nest: false,
      scriptTarget: 'esnext',
      scriptKind: 'ts',
    })

    expect(docs).toEqual([
      {
        name: 'foo',
        type: 'function',
        start: { line: 1, column: 4 },
        end: { line: 1, column: 24 },
        returnType: '',
        params: [],
      },
      {
        name: 'bar',
        type: 'function',
        start: { line: 2, column: 4 },
        end: { line: 2, column: 50 },
        returnType: '',
        params: [
          { name: 'arg1', type: 'string', default: '', alias: 'string' },
          { name: 'arg2', type: 'number', default: '', alias: 'number' },
        ],
      },
      {
        name: 'baz',
        type: 'function',
        start: { line: 3, column: 4 },
        end: { line: 3, column: 44 },
        returnType: 'T',
        params: [
          { name: 'arg1', type: 'new () => T', default: '', alias: 'Class' },
        ],
      },
      {
        name: 'Foo',
        type: 'interface',
        start: { line: 4, column: 4 },
        end: { line: 6, column: 5 },
        methods: [
          {
            name: 'foo',
            type: 'function',
            start: { line: 5, column: 6 },
            end: { line: 5, column: 45 },
            params: [
              { name: 'arg1', type: 'string', default: '', alias: 'string' },
              { name: 'arg2', type: 'number', default: '', alias: 'number' },
            ],
            returnType: 'string',
          },
        ],
        heritageClauses: [],
      },
      {
        name: 'Props',
        type: 'interface',
        start: { line: 7, column: 4 },
        end: { line: 9, column: 5 },
        methods: [
          {
            name: 'onClick',
            type: 'function',
            start: { line: 8, column: 6 },
            end: { line: 8, column: 31 },
            params: [{ name: 'event', type: 'any', default: '', alias: 'any' }],
            returnType: 'void',
          },
        ],
        heritageClauses: [],
      },
      {
        name: 'Bar',
        type: 'class',
        start: { line: 10, column: 4 },
        end: { line: 16, column: 5 },
        methods: [
          {
            name: 'props',
            type: 'property',
            start: { line: 11, column: 6 },
            end: { line: 11, column: 18 },
            params: [],
            returnType: 'Props',
          },
          {
            name: 'foo',
            type: 'function',
            start: { line: 12, column: 6 },
            end: { line: 12, column: 48 },
            params: [
              { name: 'arg1', type: 'string', default: '', alias: 'string' },
              { name: 'arg2', type: 'number', default: '', alias: 'number' },
            ],
            returnType: 'number',
          },
          {
            name: 'bar',
            type: 'function',
            start: { line: 13, column: 6 },
            end: { line: 15, column: 7 },
            params: [
              { name: 'arg1', type: 'number', default: '', alias: 'number' },
            ],
            returnType: '',
          },
        ],
        heritageClauses: [{ type: 'implements', value: 'Foo' }],
      },
    ])
  })

  it('parse/flow', () => {
    const code = `
    // @flow
    const foo = ({ foo: arg1 }) => {}
    `
    const docs = parse({
      code,
      lines: code.split('\n'),
      nest: false,
      scriptTarget: 'esnext',
      scriptKind: 'js',
    })
    expect(docs).toEqual([
      {
        name: 'foo',
        type: 'function',
        start: { line: 2, column: 4 },
        end: { line: 2, column: 37 },
        returnType: '',
        params: [{ name: '', type: '', default: '', alias: '' }],
      },
    ])
  })
})
