# Lehre

![build](https://github.com/heavenshell/ts-lehre/workflows/build/badge.svg)

Lehre is document block generator.

Generate JsDoc style document from source code.

## Install

```console
yarn add -D -E lehre
```

## Usage

```console
cat src/app.ts | lehre --stdin
```

Specify directory and ignore patterns.

```console
lehre --target-dir=./src --ignore-patterns="spec.ts"
```

Specify file and use babel parser.

```console
lehere --target-file=./src/app.ts --parser=babel
```

## Formatters

You can choose document block formatter from [JsDoc](https://jsdoc.app/), [ESDoc](https://github.com/esdoc/esdoc), [TSDoc](https://github.com/microsoft/tsdoc) and your custom formatter.

### JsDoc(default)

```console
cat src/app.ts | lehre --stdin
```

### EsDoc

```console
cat src/app.ts | lehre --stdin --formatter=esdoc
```

### TsDoc

```console
cat src/app.ts | lehre --stdin --formatter=tsdoc
```

### Coustom formatter

```console
cat src/app/ts | lehre --template-path=./examples/template.js
```

## Custom formatter

You can create your own cutom document block formatter.

Return string value and it insert above to signature automatically.

`examples/template.js` is sample formatter.

### Formatter api

#### generateClassDoc

```typescript
generateClassDoc: (
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  methods: [
    name: string,
    type: string,
    start: { line: number, charactor: number },
    end: { line: number, charactor: number },
    params: ParamProps[
      name: string,
      type: string,
      default: string,
      alias: string,
    ],
    returnType: string,
  ],
  heritageClauses: [{ type: string, value: string }],
) => string
```

#### generateInterfaceDoc

```typescript
generateInterfaceDoc: ({
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  methods: [
    name: string,
    type: string,
    start: { line: number, charactor: number },
    end: { line: number, charactor: number },
    params: ParamProps[
      name: string,
      type: string,
      default: string,
      alias: string,
    ],
    returnType: string,
  ],
  heritageClauses: [{ type: string, value: string }],
}) => string
```

#### generatePropertyDoc

```typescript
generatePropertyDoc: ({
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  params: ParamProps[
    name: string,
    type: string,
    default: string,
    alias: string,
  ],
  returnType: string,
}) => string
```

#### generateFunctionDoc

```typescript
generateFunctionDoc: ({
  name: string,
  type: string,
  start: { line: number, charactor: number },
  end: { line: number, charactor: number },
  params: ParamProps[
    name: string,
    type: string,
    default: string,
    alias: string,
  ],
  returnType: string,
}) => string
```

## LICENSE

MIT
