import { ClassDocProps, FunctionDocProps, ParamProps } from '../types'

const formatParam = (param: ParamProps) => {
  if (param.alias) {
    if (param.name) {
      return `{${param.alias}} ${param.name}`
    }
    return param.alias
  }

  if (param.name) {
    return `{${param.type}} ${param.name}`
  }
  return `{${param.type}}`
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
 * @${doc.heritageClauses.map((h) => `${h.type} ${h.value}`).join('\n * @')}
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
 * @returns {${doc.returnType}}
 */`
      : `
 */`
    return `${start.trimLeft()}${delimiter}${end.trimRight()}`
  },
}
