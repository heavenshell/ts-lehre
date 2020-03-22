import path from 'path'

import {
  ClassDocProps,
  DocProps,
  FunctionDocProps,
  OutputProps,
} from '../types'

export const getFormatterPath = (formatter: string) => {
  return path.resolve(path.join(__dirname, `./${formatter}`))
}

const formatIndent = (doc: string, indent: number) => {
  if (indent === 0) {
    return doc
  }
  const docs = doc.split('\n')
  return docs.map((d) => `${' '.repeat(indent)}${d}`).join('\n')
}

export const generateDocs = (templatePath: string, docs: DocProps[]) => {
  const {
    generateClassDoc,
    generateFunctionDoc,
    generateInterfaceDoc,
    generatePropertyDoc,
  } = require(templatePath) // eslint-disable-line @typescript-eslint/no-var-requires
  const results: OutputProps[] = []
  docs.forEach((doc) => {
    switch (doc.type) {
      case 'class':
      case 'interface':
        const fn =
          doc.type === 'class' ? generateClassDoc : generateInterfaceDoc

        if (typeof fn === 'undefined') {
          break
        }
        results.push({
          doc: formatIndent(fn(doc as ClassDocProps), doc.start.character),
          start: doc.start,
          end: doc.end,
          type: doc.type,
        })

        doc.methods &&
          doc.methods.forEach((method) => {
            const fn =
              method.type === 'function'
                ? generateFunctionDoc
                : generatePropertyDoc
            if (typeof fn === 'undefined') {
              return
            }
            results.push({
              doc: formatIndent(fn(method), method.start.character),
              start: method.start,
              end: method.end,
              type: method.type,
            })
          })
        break
      case 'function':
      case 'variable':
        if (typeof generateFunctionDoc === 'undefined') {
          break
        }
        results.push({
          doc: formatIndent(
            generateFunctionDoc(doc as FunctionDocProps),
            doc.start.character
          ),
          start: doc.start,
          end: doc.end,
          type: doc.type,
        })
        break
    }
  })
  return results
}
