import {
  createSourceFile,
  FunctionDeclaration,
  ScriptKind,
  ScriptTarget,
} from 'typescript'

import { getFunctionDoc } from './functions'

describe('functions', () => {
  it('getFunctionDoc', () => {
    const code = `
    function foo() {
    }
    `

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getFunctionDoc(
      source.statements[0] as FunctionDeclaration,
      source
    )

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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getFunctionDoc(
      source.statements[0] as FunctionDeclaration,
      source
    )

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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getFunctionDoc(
      source.statements[0] as FunctionDeclaration,
      source
    )

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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getFunctionDoc(
      source.statements[0] as FunctionDeclaration,
      source
    )

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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const actual = getFunctionDoc(
      source.statements[0] as FunctionDeclaration,
      source
    )

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
})
