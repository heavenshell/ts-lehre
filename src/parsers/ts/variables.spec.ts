import {
  createSourceFile,
  ScriptKind,
  ScriptTarget,
  VariableStatement,
} from 'typescript'

import { getVariableDoc } from './variables'

describe('variables', () => {
  it('getVariableDoc', () => {
    const code = `const foo = () => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const start = { line: 0, character: 0 }
    const end = { line: 0, character: 20 }
    const statement = source.statements[0] as VariableStatement
    const actual = getVariableDoc(
      statement.declarationList.declarations[0],
      source,
      start,
      end
    )

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start,
      end,
      params: [],
      returnType: '',
    })
  })

  it('getVariableDoc with args', () => {
    const code = `const foo = (arg1: string, arg2: number) {}
    `

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const start = { line: 0, character: 0 }
    const end = { line: 0, character: 43 }
    const statement = source.statements[0] as VariableStatement
    const actual = getVariableDoc(
      statement.declarationList.declarations[0],
      source,
      start,
      end
    )

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start,
      end,
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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const start = { line: 0, character: 0 }
    const end = { line: 0, character: 54 }
    const statement = source.statements[0] as VariableStatement
    const actual = getVariableDoc(
      statement.declarationList.declarations[0],
      source,
      start,
      end
    )

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start: { line: 0, character: 0 },
      end: { line: 0, character: 54 },
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
    const code = `const foo = (arg1: string = 'foo', arg2: number = 100): number {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const start = { line: 0, character: 0 }
    const end = { line: 0, character: 65 }
    const statement = source.statements[0] as VariableStatement
    const actual = getVariableDoc(
      statement.declarationList.declarations[0],
      source,
      start,
      end
    )

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start,
      end,
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

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const start = { line: 0, character: 0 }
    const end = { line: 0, character: 55 }
    const statement = source.statements[0] as VariableStatement
    const actual = getVariableDoc(
      statement.declarationList.declarations[0],
      source,
      start,
      end
    )

    expect(actual).toEqual({
      name: 'foo',
      type: 'function',
      start,
      end,
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
