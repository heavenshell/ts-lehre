import {
  createSourceFile,
  ScriptKind,
  ScriptTarget,
  VariableStatement,
} from 'typescript'

import { getParameter } from './parameters'

describe('parameters', () => {
  it('getParameter with string type', () => {
    const code = `const foo = (arg1: string) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'string',
      default: '',
      alias: 'string',
    })
  })

  it('getParameter with number type', () => {
    const code = `const foo = (arg1: number) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'number',
      default: '',
      alias: 'number',
    })
  })

  it('getParameter with boolean type', () => {
    const code = `const foo = (arg1: boolean) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'boolean',
      default: '',
      alias: 'boolean',
    })
  })

  it('getParameter with any type', () => {
    const code = `const foo = (arg1: any) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'any',
      default: '',
      alias: 'any',
    })
  })

  it('getParameter with array', () => {
    const code = `const foo = (arg1: Array<number>) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'Array',
      default: '',
      alias: '',
    })
  })

  it('getParameter with object', () => {
    const code = `const foo = (arg1: { foo: string }) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: '{ foo: string }',
      default: '',
      alias: 'Object',
    })
  })

  it('getParameter with function', () => {
    const code = `const foo = (arg1: (arg1: string) => string) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: '(arg1: string) => string',
      default: '',
      alias: 'Function',
    })
  })

  it('getParameter with type', () => {
    const code = `const foo = (arg1: Foo) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'Foo',
      default: '',
      alias: '',
    })
  })

  it('getParameter with class', () => {
    const code = `const foo = (arg1: new () => T) => {}`

    const source = createSourceFile(
      'lehre.ts',
      code,
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS
    )
    const statement = source.statements[0] as VariableStatement
    const initializer = statement.declarationList.declarations[0].initializer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parameters = (initializer as any).parameters
    const actual = getParameter(parameters[0], source)

    expect(actual).toEqual({
      name: 'arg1',
      type: 'new () => T',
      default: '',
      alias: 'Class',
    })
  })
})
