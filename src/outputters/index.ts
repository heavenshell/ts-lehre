import fs from 'fs'
import path from 'path'

import { OutputProps } from '../types'

type Props = {
  lines: string[]
  docs: OutputProps[]
  filePath: string
}

export const stringOutputter = ({ lines, docs }: Props) => {
  const outputs = Object.assign([], lines)
  docs.reverse().map(({ start, doc }) => {
    outputs.splice(start.line, 0, doc)
  })
  return outputs.join('\n')
}

export const jsonOutputter = ({ docs }: Props) => {
  return JSON.stringify(docs)
}

export const fileOutputter = ({ lines, docs, filePath }: Props) => {
  const outputs = Object.assign([], lines)
  docs.reverse().map(({ start, doc }) => {
    outputs.splice(start.line, 0, doc)
  })

  fs.writeFileSync(path.resolve(filePath), outputs.join('\n'))
  return ''
}
