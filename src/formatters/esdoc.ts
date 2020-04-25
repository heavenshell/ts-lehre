import { ClassDocProps, FunctionDocProps, ParamProps } from '../types'

const format = (value: string) => {
  const types = value.split('\n').map((v) => v.replace(/^\s+/, ''))
  return types.join(' ')
}

const formatParam = (param: ParamProps) => {
  if (param.name) {
    return `{${format(param.type)}} ${param.name}`
  }
  return `{${format(param.type)}}`
}

const generateClassDoc = (doc: ClassDocProps) => {
  const d =
    doc.heritageClauses.length === 0
      ? `
/**
 * ${doc.name}.
 */`
      : `
/**
 * ${doc.name}.
 *
 * @${doc.heritageClauses.map((h) => `${h.type} {${h.value}}`).join('\n * @')}
 */`

  return d.trim()
}

module.exports = {
  generateClassDoc,
  generateInterfaceDoc: generateClassDoc,
  generatePropertyDoc: (doc: FunctionDocProps) => {
    return `
/**
 * @type {${doc.returnType}}
 */`.trimLeft()
  },
  generateFunctionDoc: (doc: FunctionDocProps) => {
    const start =
      doc.params.length === 0
        ? `
/**
 * ${doc.name}.`
        : `
/**
 * ${doc.name}.
 *
 * @param ${doc.params.map(formatParam).join('\n * @param ')}`

    const delimiter =
      doc.params.length === 0 && doc.returnType !== ''
        ? `
 *`
        : ``

    const end = doc.returnType
      ? `
 * @return {${doc.returnType}}
 */`
      : `
 */`

    return `${start.trimLeft()}${delimiter}${end.trimRight()}`
  },
}
