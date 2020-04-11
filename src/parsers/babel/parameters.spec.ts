import { Identifier } from '@babel/types'

import { getAst } from './helper'
import { getParameter } from './parameters'

describe('parameters', () => {
  it('getParameter with string type', () => {
    const code = `const foo = (arg1: string) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'string',
      default: '',
      alias: 'string',
    })
  })

  it('getParameter with number type', () => {
    const code = `const foo = (arg1: number) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'number',
      default: '',
      alias: 'number',
    })
  })

  it('getParameter with boolean type', () => {
    const code = `const foo = (arg1: boolean) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'boolean',
      default: '',
      alias: 'boolean',
    })
  })

  it('getParameter with any type', () => {
    const code = `const foo = (arg1: any) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'any',
      default: '',
      alias: 'any',
    })
  })

  it('getParameter with array', () => {
    const code = `const foo = (arg1: Array<number>) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'Array<number>',
      default: '',
      alias: '',
    })
  })

  it('getParameter with object', () => {
    const code = `const foo = (arg1: { foo: string }) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: '{ foo: string }',
      default: '',
      alias: 'Object',
    })
  })

  it('getParameter with function', () => {
    const code = `const foo = (arg1: (arg1: string) => string) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: '(arg1: string) => string',
      default: '',
      alias: 'Function',
    })
  })

  it('getParameter with type', () => {
    const code = `const foo = (arg1: Foo) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'Foo',
      default: '',
      alias: '',
    })
  })

  it('getParameter with class', () => {
    const code = `const foo = (arg1: new () => T) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'new () => T',
      default: '',
      alias: 'Class',
    })
  })

  it('getParameter with union', () => {
    const code = `const foo = (arg1: number | string) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'number | string',
      default: '',
      alias: '',
    })
  })

  it('getParameter with default', () => {
    const code = `const foo = (arg1: number = 100) => {}`

    const ast = getAst(code)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = ast.program.body[0] as any
    const actual = getParameter(
      body.declarations[0].init.params[0] as Identifier,
      code.split('\n')
    )

    expect(actual).toEqual({
      name: 'arg1',
      type: 'number',
      default: '100',
      alias: 'number',
    })
  })
})
