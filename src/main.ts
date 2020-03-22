import fs from 'fs'
import path from 'path'

import { stringOutputter, jsonOutputter } from './outputters'
import { parse } from './parsers/ts'
import { generateDocs, getFormatterPath } from './formatters'
import { CompilerOptionProps, ConfigProps, OutputProps } from './types'

const walk = (
  dir: string,
  allFiles: string[] = [],
  ignores: string[] = [],
  ignorePatterns = ''
) => {
  const d = path.basename(dir)
  if (ignores.includes(d)) {
    return
  }
  const files = fs
    .readdirSync(dir)
    .map((f) => path.join(dir, f))
    .filter((f) => {
      if (ignorePatterns === '') {
        return true
      }
      if (new RegExp(ignorePatterns).exec(f)) {
        return false
      }
      return true
    })

  allFiles.push(...files)
  files.forEach((f) => {
    if (fs.statSync(f).isDirectory()) {
      walk(f, allFiles, ignores, ignorePatterns)
    }
  })
}

const getCodeFromStdin = () => {
  // https://github.com/nodejs/node/blob/master/doc/api/process.md#processstdin
  return new Promise<string>((resolve) => {
    const contents: string[] = []
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk: string) => {
      contents.push(chunk)
    })

    process.stdin.on('end', () => {
      resolve(contents.join('\n'))
    })
  })
}

const getCodeFromFile = (targetFile: string) => {
  const targetPath = path.resolve(targetFile)
  return fs.readFileSync(targetPath, { encoding: 'utf-8' })
}

const getTargetFiles = (
  targetDir: string,
  ignores: string[],
  ignorePatterns: string
) => {
  const dirs: string[] = []
  walk(path.resolve(targetDir), dirs, ignores, ignorePatterns)
  return dirs.filter((dir) => {
    const ext = path.extname(dir)
    switch (ext) {
      case '.ts':
      case '.tsx':
      case '.js':
      case '.mjs':
        return true
    }
    return false
  })
}

export const run = (
  code: string,
  templatePath: string,
  nest: boolean,
  outputFn: (lines: string[], results: OutputProps[]) => string,
  options: CompilerOptionProps
) => {
  if (!code) {
    return ''
  }
  const lines = code.split('\n')
  const docs = parse(code, lines, nest, {
    scriptKind: options.scriptKind,
    scriptTarget: options.scriptTarget,
  })

  const results: OutputProps[] = generateDocs(templatePath, docs)
  // require('util').inspect.defaultOptions.depth = null
  return outputFn(lines, results)
}

export const main = async (config: ConfigProps) => {
  const targets: string[] = []
  if (config.targetDir) {
    const { targetDir, ignores, ignorePatterns } = config
    const files = getTargetFiles(targetDir, ignores, ignorePatterns)
    files.forEach((f) => targets.push(f))
  } else {
    if (config.targetFile) {
      targets.push(config.targetFile)
    }
  }
  if (!config.isStdin && targets.length === 0) {
    return []
  }

  const templatePath =
    config.templatePath === ''
      ? getFormatterPath(config.formatter)
      : path.resolve(config.templatePath)

  const outputFn = config.style === 'string' ? stringOutputter : jsonOutputter

  const options = {
    scriptKind: config.scriptKind,
    scriptTarget: config.scriptTarget,
  }

  const outputs = config.isStdin
    ? [
        run(
          await getCodeFromStdin(),
          templatePath,
          config.nest,
          outputFn,
          options
        ),
      ]
    : targets.map((t) => {
        const code = getCodeFromFile(t)
        return run(code, templatePath, config.nest, outputFn, options)
      })

  return outputs
}
