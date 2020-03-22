import path from 'path'

import { generateDocs, getFormatterPath } from '.'

describe('formatters', () => {
  it('getFormatterPath', () => {
    const files = ['jsdoc', 'esdoc', 'tsdoc']
    files.map(f => {
      const actual = getFormatterPath(f)
      expect(actual).toBe(path.resolve(path.join(__dirname, `./${f}`)))
    })
  })

  it('generateDocs - variable', () => {
    const docs = [
      {
        name: 'foo',
        type: 'function',
        start: { line: 0, character: 0 },
        end: { line: 1, character: 1 },
        returnType: 'number',
        params: [
          { name: 'arg1', type: 'string', default: '', alias: 'string' },
          { name: 'arg2', type: 'number', default: '', alias: 'number' },
        ],
      },
    ]
    const templatePath = path.resolve(path.join(__dirname, `./jsdoc`))
    const actual = generateDocs(templatePath, docs)
    expect(actual).toEqual([
      {
        doc: [
          '/**',
          ' * foo.',
          ' *',
          ' * @param {string} arg1',
          ' * @param {number} arg2',
          ' * @returns {number}',
          ' */',
        ].join('\n'),
        start: { line: 0, character: 0 },
        end: { line: 1, character: 1 },
        type: 'function',
      },
    ])
  })

  it('generateDocs - function', () => {
    const docs = [
      {
        name: 'foo',
        type: 'function',
        start: { line: 0, character: 0 },
        end: { line: 3, character: 1 },
        returnType: 'number',
        rawType: '',
        params: [
          { name: 'arg1', type: 'number', default: '', alias: 'number' },
          { name: 'arg2', type: 'string', default: '', alias: 'string' },
        ],
      },
    ]
    const templatePath = path.resolve(path.join(__dirname, `./jsdoc`))
    const actual = generateDocs(templatePath, docs)
    expect(actual).toEqual([
      {
        doc: [
          '/**',
          ' * foo.',
          ' *',
          ' * @param {number} arg1',
          ' * @param {string} arg2',
          ' * @returns {number}',
          ' */',
        ].join('\n'),
        start: { line: 0, character: 0 },
        end: { line: 3, character: 1 },
        type: 'function',
      },
    ])
  })

  it('generateDocs - interface', () => {
    const docs = [
      {
        name: 'Foo',
        type: 'interface',
        start: { line: 0, character: 0 },
        end: { line: 2, character: 1 },
        methods: [
          {
            name: 'foo',
            type: 'function',
            start: { line: 1, character: 2 },
            end: { line: 1, character: 41 },
            params: [
              { name: 'arg1', type: 'number', default: '', alias: 'number' },
              { name: 'arg2', type: 'string', default: '', alias: 'string' },
            ],
            returnType: 'string',
          },
        ],
        heritageClauses: [],
      },
    ]
    const templatePath = path.resolve(path.join(__dirname, `./jsdoc`))
    const actual = generateDocs(templatePath, docs)
    expect(actual).toEqual([
      {
        doc: ['/**', ' * Foo.', ' */'].join('\n'),
        start: { line: 0, character: 0 },
        end: { line: 2, character: 1 },
        type: 'interface',
      },
      {
        doc: [
          '  /**',
          '   * foo.',
          '   *',
          '   * @param {number} arg1',
          '   * @param {string} arg2',
          '   * @returns {string}',
          '   */',
        ].join('\n'),
        start: { line: 1, character: 2 },
        end: { line: 1, character: 41 },
        type: 'function',
      },
    ])
  })

  it('generateDocs - class', () => {
    const docs = [
      {
        name: 'Foo',
        type: 'class',
        start: { line: 0, character: 0 },
        end: { line: 8, character: 1 },
        methods: [
          {
            name: 'foo',
            type: 'property',
            start: { line: 1, character: 2 },
            end: { line: 1, character: 10 },
            params: [],
            returnType: 'Bar',
          },
          {
            name: 'Constructor',
            type: 'function',
            start: { line: 3, character: 2 },
            end: { line: 4, character: 3 },
            params: [
              { name: 'arg1', type: 'number', default: '', alias: 'number' },
            ],
            returnType: '',
          },
          {
            name: 'save',
            type: 'function',
            start: { line: 6, character: 2 },
            end: { line: 7, character: 3 },
            params: [
              { name: 'arg1', type: 'string', default: '', alias: 'string' },
            ],
            returnType: 'void',
          },
        ],
        heritageClauses: [],
      },
    ]

    const templatePath = path.resolve(path.join(__dirname, `./jsdoc`))
    const actual = generateDocs(templatePath, docs)
    expect(actual).toEqual([
      {
        doc: ['/**', ' * Foo.', ' */'].join('\n'),
        start: { line: 0, character: 0 },
        end: { line: 8, character: 1 },
        type: 'class',
      },
      {
        doc: ['  /**', '   * @type {Bar}', '   */'].join('\n'),
        start: { line: 1, character: 2 },
        end: { line: 1, character: 10 },
        type: 'property',
      },
      {
        doc: [
          '  /**',
          '   * Constructor.',
          '   *',
          '   * @param {number} arg1',
          '   */',
        ].join('\n'),
        start: { line: 3, character: 2 },
        end: { line: 4, character: 3 },
        type: 'function',
      },
      {
        doc: [
          '  /**',
          '   * save.',
          '   *',
          '   * @param {string} arg1',
          '   * @returns {void}',
          '   */',
        ].join('\n'),
        start: { line: 6, character: 2 },
        end: { line: 7, character: 3 },
        type: 'function',
      },
    ])
  })
})
