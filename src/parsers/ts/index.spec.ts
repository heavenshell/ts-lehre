import { ScriptKind, ScriptTarget } from 'typescript'

import { getLineAndPosition, parse } from '.'

describe('parsers', () => {
  const options = {
    scriptTarget: ScriptTarget.ESNext,
    scriptKind: ScriptKind.TS,
  }

  it('getLineAndPosition', () => {
    const code = `
    class Foo {
      constructor(arg1, arg2) {
      }
    }`
    const { line, character } = getLineAndPosition(code.split('\n'))(2)
    // Line and position of `constructor`.
    expect(line).toBe(2)
    expect(character).toBe(6)
  })

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
    const docs = parse(code, code.split('\n'), false, options)

    expect(docs).toEqual([
      {
        name: 'foo',
        type: 'function',
        start: { line: 1, character: 4 },
        end: { line: 1, character: 24 },
        returnType: '',
        params: [],
      },
      {
        name: 'bar',
        type: 'function',
        start: { line: 2, character: 4 },
        end: { line: 2, character: 50 },
        returnType: '',
        params: [
          { name: 'arg1', type: 'string', default: '', alias: 'string' },
          { name: 'arg2', type: 'number', default: '', alias: 'number' },
        ],
      },
      {
        name: 'baz',
        type: 'function',
        start: { line: 3, character: 4 },
        end: { line: 3, character: 44 },
        returnType: 'T',
        params: [
          { name: 'arg1', type: 'new () => T', default: '', alias: 'Class' },
        ],
      },
      {
        name: 'Foo',
        type: 'interface',
        start: { line: 4, character: 4 },
        end: { line: 6, character: 5 },
        methods: [
          {
            name: 'foo',
            type: 'function',
            start: { line: 5, character: 6 },
            end: { line: 5, character: 45 },
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
        start: { line: 7, character: 4 },
        end: { line: 9, character: 5 },
        methods: [
          {
            name: 'onClick',
            type: 'function',
            start: { line: 8, character: 6 },
            end: { line: 8, character: 31 },
            params: [{ name: 'event', type: 'any', default: '', alias: 'any' }],
            returnType: 'void',
          },
        ],
        heritageClauses: [],
      },
      {
        name: 'Bar',
        type: 'class',
        start: { line: 10, character: 4 },
        end: { line: 16, character: 5 },
        methods: [
          {
            name: 'props',
            type: 'property',
            start: { line: 11, character: 6 },
            end: { line: 11, character: 18 },
            params: [],
            returnType: 'Props',
          },
          {
            name: 'foo',
            type: 'function',
            start: { line: 12, character: 6 },
            end: { line: 12, character: 48 },
            params: [
              { name: 'arg1', type: 'string', default: '', alias: 'string' },
              { name: 'arg2', type: 'number', default: '', alias: 'number' },
            ],
            returnType: 'number',
          },
          {
            name: 'bar',
            type: 'function',
            start: { line: 13, character: 6 },
            end: { line: 15, character: 7 },
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
})
