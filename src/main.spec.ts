import path from 'path'

import { main } from './main'
import { ConfigProps } from './types'

describe('main', () => {
  it('run with target file', async () => {
    const config: ConfigProps = {
      parser: 'ts',
      targetFile: path.resolve(
        path.join(__dirname, '__fixtures__', 'functions.ts')
      ),
      targetDir: '',
      formatter: 'jsdoc',
      isStdin: false,
      templatePath: '',
      style: 'string',
      ignores: [],
      ignorePatterns: '',
      nest: true,
      write: false,
      scriptTarget: 'esnext',
      scriptKind: 'ts',
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
    const config: ConfigProps = {
      targetFile: '',
      targetDir: path.resolve(path.join(__dirname, '__fixtures__')),
      formatter: 'jsdoc',
      isStdin: false,
      templatePath: '',
      style: 'string',
      ignores: [],
      ignorePatterns: '',
      nest: true,
      write: false,
      parser: 'ts',
      scriptTarget: 'esnext',
      scriptKind: 'ts',
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
      '   * constructor.',
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
