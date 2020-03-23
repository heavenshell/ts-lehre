import path from 'path'

import { ScriptKind, ScriptTarget } from 'typescript'

import { main } from './main'

describe('main', () => {
  it('run with target file', async () => {
    const config = {
      targetFile: path.resolve(
        path.join(__dirname, '__fixtures__', 'functions.ts')
      ),
      targetDir: '',
      scriptKind: ScriptKind.TS,
      scriptTarget: ScriptTarget.ESNext,
      formatter: 'jsdoc',
      isStdin: false,
      templatePath: '',
      style: 'string',
      ignores: [],
      ignorePatterns: '',
      nest: true,
    }

    const actual = await main(config)
    const expected = [
      '/**',
      ' * foo.',
      ' */',
      'export function foo() {',
      '  return',
      '}',
      '',
      '/**',
      ' * bar.',
      ' *',
      ' * @param {string} arg1',
      ' * @param {number} arg2',
      ' * @returns {string}',
      ' */',
      'export function bar(arg1: string, arg2: number): string {',
      '  return `${arg1} ${arg2}`',
      '}',
      '',
    ].join('\n')
    expect(actual).toEqual([expected])
  })

  it('run with target dir', async () => {
    const config = {
      targetFile: '',
      targetDir: path.resolve(path.join(__dirname, '__fixtures__')),
      scriptKind: ScriptKind.TS,
      scriptTarget: ScriptTarget.ESNext,
      formatter: 'jsdoc',
      isStdin: false,
      templatePath: '',
      style: 'string',
      ignores: [],
      ignorePatterns: '',
      nest: true,
    }

    const actual = await main(config)
    const classes = [
      '/**',
      ' * Props.',
      ' */',
      'interface Props {',
      '  /**',
      '   * @type {string}',
      '   */',
      '  arg1: string',
      '}',
      '/**',
      ' * Foo.',
      ' */',
      'export class Foo {',
      '  /**',
      '   * @type {Props}',
      '   */',
      "  props: Props = { arg1: '' }",
      '  /**',
      '   * @type {string}',
      '   */',
      '  arg1: string',
      '  /**',
      '   * Constructor.',
      '   *',
      '   * @param {string} arg1',
      '   */',
      '  constructor(arg1: string) {',
      '    this.arg1 = arg1',
      '  }',
      '',
      '  /**',
      '   * foo.',
      '   *',
      '   * @param {string} arg1',
      '   */',
      '  foo(arg1: string) {',
      '    /**',
      '     * bar.',
      '     *',
      '     * @param {string} arg2',
      '     * @returns {string}',
      '     */',
      '    const bar = (arg2: string): string => {',
      '      return arg2',
      '    }',
      '    return bar(arg1)',
      '  }',
      '}',
      '',
    ].join('\n')
    const functions = [
      '/**',
      ' * foo.',
      ' */',
      'export function foo() {',
      '  return',
      '}',
      '',
      '/**',
      ' * bar.',
      ' *',
      ' * @param {string} arg1',
      ' * @param {number} arg2',
      ' * @returns {string}',
      ' */',
      'export function bar(arg1: string, arg2: number): string {',
      '  return `${arg1} ${arg2}`',
      '}',
      '',
    ].join('\n')
    expect(actual).toEqual([classes, functions])
  })
})
