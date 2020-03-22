# Lehre

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

## Formatters

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

## LICENSE

MIT
