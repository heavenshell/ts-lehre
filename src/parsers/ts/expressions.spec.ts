import {
  createSourceFile,
  ExpressionStatement,
  ScriptKind,
  ScriptTarget,
} from 'typescript'

import { getVariableDocFromExpression } from './expressions'

const getAst = (code: string) => {
  const source = createSourceFile(
    'lehre.ts',
    code,
    ScriptTarget.ESNext,
    false,
    ScriptKind.TS
  )
  const statement = source.statements[0] as ExpressionStatement
  return getVariableDocFromExpression(statement.expression, source)
}

describe('expressions', () => {
  it('getVariableDocFromExpression', () => {
    const code = `foo = () => {}`
    const ast = getAst(code)

    const start = { line: 0, column: 0 }
    const end = { line: 0, column: 14 }

    expect(ast).toEqual({
      name: 'foo',
      type: 'function',
      start,
      end,
      params: [],
      returnType: '',
    })
  })

  it('getVariableDoc with args', () => {
    const code = `foo = (arg1: string, arg2: number) => {}`
    const ast = getAst(code)

    const start = { line: 0, column: 0 }
    const end = { line: 0, column: 40 }

    expect(ast).toEqual({
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
    const code = `foo = (arg1: string, arg2: number): number => {}`

    const ast = getAst(code)

    const start = { line: 0, column: 0 }
    const end = { line: 0, column: 48 }

    expect(ast).toEqual({
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
      returnType: 'number',
    })
  })

  it('getVariableDoc with default parameter', () => {
    const code = `foo = (arg1: string = 'foo', arg2: number = 100): number => {}`

    const ast = getAst(code)

    const start = { line: 0, column: 0 }
    const end = { line: 0, column: 62 }

    expect(ast).toEqual({
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
    const code = `foo = (arg1: string, arg2: { foo: number }) => {}`
    const ast = getAst(code)

    const start = { line: 0, column: 0 }
    const end = { line: 0, column: 55 }

    expect(ast).toEqual({
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
