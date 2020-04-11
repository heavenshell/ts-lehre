import program from 'commander'

import { main } from './main'

import { version } from '../package.json'

const getIgnores = (ignores: string) => {
  return ignores.split(',')
}

program
  .version(version, '-v, --version')
  .option('-t, --target-file [path]', 'Path to target file.')
  .option('-d, --target-dir [path]', 'Path to target directory.')
  .option('--stdin', 'Force reading input from STDIN')
  .option('--write', 'Edit files in-place')
  .option('--template-path [path]', 'Custom formatter path')
  .option('--ignores [path]', 'Ignore directory names')
  .option('--ignore-patterns [patterns]', 'Ignore patterns')
  .option('--parser [target]', 'Parser', /^(ts|babel)$/, 'ts')
  .option(
    '--style [style]',
    'Output style string | json',
    /^(string|json)$/,
    'string'
  )
  .option(
    '--nest',
    'Enable to generate inner document only parser=ts available'
  )
  .option(
    '--scriptTarget [target]',
    'ScriptTarget ES3 | ES5 | ES2015 | ES2016 | ES2017 | ES2018 | ES2019| ESNext only parser=ts available',
    /^(ES3|ES5|ES2015|ES2016|ES2017|ES2018|ES2019|ESNext)$/,
    'ESNext'
  )
  .option(
    '--scriptKind [kind]',
    'ScriptKind JS | JSX | TS | TSX only parser=ts available',
    /^(JS|JSX|TS|TSX)$/,
    'TS'
  )
  .option(
    '--formatter [formatter]',
    'Document formatter, jsdoc | esdoc | tsdoc',
    /^(jsdoc|esdoc|tsdoc)$/,
    'jsdoc'
  )
  .parse(process.argv)

const config = {
  parser: program.parser,
  targetDir: program.targetDir || '',
  targetFile: program.targetFile || '',
  formatter: program.formatter,
  isStdin: program.stdin || false,
  templatePath: program.templatePath || '',
  style: program.style,
  ignores: getIgnores(program.ignores || ''),
  ignorePatterns: program.ignorePatterns || '',
  nest: program.nest || false,
  write: program.write || false,
  scriptTarget: program.scriptTarget,
  scriptKind: program.scriptKind,
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
