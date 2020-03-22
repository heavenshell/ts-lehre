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
      type: '',
      start: { line: 1, character: 4 },
      end: { line: 6, character: 5 },
      methods: [
        {
          name: 'props',
          type: 'property',
          start: { line: 2, character: 6 },
          end: { line: 2, character: 18 },
          params: [],
          returnType: 'Props',
        },
        {
          name: 'Constructor',
          type: 'function',
          start: { line: 3, character: 6 },
          end: { line: 3, character: 48 },
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
          start: { line: 4, character: 6 },
          end: { line: 5, character: 7 },
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
      type: '',
      start: { line: 1, character: 4 },
      end: { line: 3, character: 5 },
      methods: [
        {
          name: 'foo',
          type: 'function',
          start: { line: 2, character: 6 },
          end: { line: 2, character: 45 },
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
