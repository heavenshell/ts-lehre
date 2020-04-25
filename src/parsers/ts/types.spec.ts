import {
  createSourceFile,
  ScriptKind,
  ScriptTarget,
  TypeAliasDeclaration,
} from 'typescript'

import { getTypeDoc } from './types'

const getAcual = (code: string) => {
  const source = createSourceFile(
    'lehre.ts',
    code,
    ScriptTarget.ESNext,
    false,
    ScriptKind.TS
  )
  const actual = getTypeDoc(
    source.statements[0] as TypeAliasDeclaration,
    source
  )
  return actual
}

describe('types', () => {
  it('getTypeDoc', () => {
    const code = `
    type Foo = {
    }`
    const actual = getAcual(code)

    expect(actual).toEqual({
      name: 'Foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 2, column: 5 },
      methods: [],
      heritageClauses: [],
    })
  })

  it('getTypeDoc - with props', () => {
    const code = `
    type Foo = {
      foo: string
      bar: () => void
    }`
    const actual = getAcual(code)

    expect(actual).toEqual({
      name: 'Foo',
      type: 'function',
      start: { line: 1, column: 4 },
      end: { line: 4, column: 5 },
      methods: [],
      heritageClauses: [],
    })
  })
})
