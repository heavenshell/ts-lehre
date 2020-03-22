import { OutputProps } from '../types'

export const stringOutputter = (lines: string[], docs: OutputProps[]) => {
  const outputs = Object.assign([], lines)
  docs.reverse().map(({ start, doc }) => {
    outputs.splice(start.line, 0, doc)
  })
  return outputs.join('\n')
}

export const jsonOutputter = (_: string[], docs: OutputProps[]) => {
  return JSON.stringify(docs)
}
