describe('tsdoc', () => {
  const {
    generateClassDoc,
    generateFunctionDoc,
    generateInterfaceDoc,
    generatePropertyDoc,
  } = require('./tsdoc') // eslint-disable-line @typescript-eslint/no-var-requires

  it('generateClassDoc', () => {
    const params = {
      name: 'Foo',
      type: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      methods: [],
      heritageClauses: [],
    }
    const doc = generateClassDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * Foo.', ' */'])
  })

  it('generateClassDoc with extends', () => {
    const params = {
      name: 'Foo',
      type: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      methods: [],
      heritageClauses: [{ type: 'extends', value: 'Base' }],
    }
    const doc = generateClassDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * Foo.', ' *', ' * @extends Base', ' */'])
  })

  it('generateClassDoc with implements', () => {
    const params = {
      name: 'Foo',
      type: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      methods: [],
      heritageClauses: [{ type: 'implements', value: 'Base' }],
    }
    const doc = generateClassDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * Foo.', ' *', ' * @implements Base', ' */'])
  })

  it('generateClassDoc with implements and extends', () => {
    const params = {
      name: 'Foo',
      type: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      methods: [],
      heritageClauses: [
        { type: 'implements', value: 'Base' },
        { type: 'extends', value: 'BaseClass' },
      ],
    }
    const doc = generateClassDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual([
      '/**',
      ' * Foo.',
      ' *',
      ' * @implements Base',
      ' * @extends BaseClass',
      ' */',
    ])
  })

  it('generateInterfaceDoc', () => {
    const params = {
      name: 'Foo',
      type: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      methods: [],
      heritageClauses: [],
    }
    const doc = generateInterfaceDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * Foo.', ' */'])
  })

  it('generateInterfaceDoc with extends', () => {
    const params = {
      name: 'Foo',
      type: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      methods: [],
      heritageClauses: [{ type: 'extends', value: 'Base' }],
    }
    const doc = generateInterfaceDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * Foo.', ' *', ' * @extends Base', ' */'])
  })

  it('generatePropertyDoc', () => {
    const params = {
      name: 'foo',
      returnType: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      params: [],
    }
    const doc = generatePropertyDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * foo.', ' */'])
  })

  it('generatePropertyDoc with type', () => {
    const params = {
      name: 'foo',
      returnType: 'string',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      params: [],
    }
    const doc = generatePropertyDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * foo.', ' */'])
  })

  it('generateFunctionDoc', () => {
    const params = {
      name: 'foo',
      returnType: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      params: [],
    }
    const doc = generateFunctionDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual(['/**', ' * foo.', ' */'])
  })

  it('generateFunctionDoc with return type', () => {
    const params = {
      name: 'foo',
      returnType: 'string',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      params: [],
    }
    const doc = generateFunctionDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual([
      '/**',
      ' * foo.',
      ' *',
      ' * @returns',
      ' */',
    ])
  })

  it('generateFunctionDoc with param', () => {
    const params = {
      name: 'foo',
      returnType: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      params: [
        {
          name: 'arg1',
          type: 'string',
          default: '',
          alias: 'string',
        },
      ],
    }
    const doc = generateFunctionDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual([
      '/**',
      ' * foo.',
      ' *',
      ' * @param arg1 -',
      ' */',
    ])
  })

  it('generateFunctionDoc with params', () => {
    const params = {
      name: 'foo',
      returnType: '',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
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
    }
    const doc = generateFunctionDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual([
      '/**',
      ' * foo.',
      ' *',
      ' * @param arg1 -',
      ' * @param arg2 -',
      ' */',
    ])
  })

  it('generateFunctionDoc with params and return type', () => {
    const params = {
      name: 'foo',
      returnType: 'number',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
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
    }
    const doc = generateFunctionDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual([
      '/**',
      ' * foo.',
      ' *',
      ' * @param arg1 -',
      ' * @param arg2 -',
      ' * @returns',
      ' */',
    ])
  })

  it('generateFunctionDoc with ailas param', () => {
    const params = {
      name: 'foo',
      returnType: 'number',
      start: { line: 0, character: 0 },
      end: { line: 1, character: 0 },
      params: [
        {
          name: 'arg1',
          type: '{ arg1: string }',
          default: '',
          alias: 'Object',
        },
      ],
    }
    const doc = generateFunctionDoc(params)
    const docs = doc.split('\n')
    expect(docs).toEqual([
      '/**',
      ' * foo.',
      ' *',
      ' * @param arg1 -',
      ' * @returns',
      ' */',
    ])
  })
})
