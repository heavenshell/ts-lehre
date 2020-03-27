import { ScriptKind, ScriptTarget } from 'typescript'
import program from 'commander'

import { main } from './main'

const getTarget = (target: string) => {
  switch (target.toLowerCase()) {
    case 'es3':
      return ScriptTarget.ES3
    case 'es5':
      return ScriptTarget.ES5
    case 'es2015':
      return ScriptTarget.ES2015
    case 'es2016':
      return ScriptTarget.ES2016
    case 'es2017':
      return ScriptTarget.ES2017
    case 'es2018':
      return ScriptTarget.ES2018
    case 'es2019':
      return ScriptTarget.ES2019
    case 'es2020':
      return ScriptTarget.ES2020
    default:
      return ScriptTarget.ESNext
  }
}

const getKind = (kind: string) => {
  switch (kind.toLowerCase()) {
    case 'js':
      return ScriptKind.JS
    case 'jsx':
      return ScriptKind.JSX
    case 'tsx':
      return ScriptKind.TSX
    default:
      return ScriptKind.TS
  }
}

const getIgnores = (ignores: string) => {
  return ignores.split(',')
}

program
  .version('1.0.0', '-v, --version')
  .option('-t, --target-file [path]', 'Path to target file.')
  .option('-d, --target-dir [path]', 'Path to target directory.')
  .option('--stdin', 'Force reading input from STDIN')
  .option('--nest', 'Enable to generate inner document')
  .option('--write', 'Edit files in-place')
  .option('--template-path [path]', 'Custom formatter path')
  .option('--ignores [path]', 'Ignore directory names')
  .option('--ignore-patterns [patterns]', 'Ignore patterns')
  .option(
    '--scriptTarget [target]',
    'ScriptTarget default is ESNext',
    /^(ES3|ES5|ES2015|ES2016|ES2017|ES2018|ES2019|ESNext)$/,
    'ESNext'
  )
  .option(
    '--scriptKind [kind]',
    'ScriptKind default is TS',
    /^(JS|JSX|TS|TSX)$/,
    'TS'
  )
  .option(
    '--formatter [formatter]',
    'Document formatter default is jsdoc',
    /^(jsdoc|esdoc|tsdoc)$/,
    'jsdoc'
  )
  .option(
    '--style [style]',
    'Output style default is string',
    /^(string|json)$/,
    'string'
  )
  .parse(process.argv)

const config = {
  targetDir: program.targetDir || '',
  targetFile: program.targetFile || '',
  formatter: program.formatter,
  isStdin: program.stdin || false,
  scriptTarget: getTarget(program.scriptTarget),
  scriptKind: getKind(program.scriptKind),
  templatePath: program.templatePath || '',
  style: program.style,
  ignores: getIgnores(program.ignores || ''),
  ignorePatterns: program.ignorePatterns || '',
  nest: program.nest || false,
  write: program.write || false,
}

main(config)
  .then((data) => {
    if (data) {
      data.forEach((d) => {
        if (d) {
          process.stdout.write(d)
        }
      })
    }
  })
  .catch((e) => {
    console.log(e) // eslint-disable-line no-console
    process.exit(1)
  })
