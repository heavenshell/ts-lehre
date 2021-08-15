import { Command } from 'commander'

import { main } from './main'

import { version } from '../package.json'

const getIgnores = (ignores: string) => {
  return ignores.split(',')
}

const program = new Command()

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
    'Output style(string | json)',
    /^(string|json)$/,
    'string'
  )
  .option(
    '--nest',
    'Enable to generate inner document(only parser=ts available)'
  )
  .option(
    '--scriptTarget [target]',
    '[ES3 | ES5 | ES2015 | ES2016 | ES2017 | ES2018 | ES2019 | ESNext]',
    /^(ES3|ES5|ES2015|ES2016|ES2017|ES2018|ES2019|ESNext)$/,
    'ESNext'
  )
  .option(
    '--scriptKind [kind]',
    '[JS | JSX | TS | TSX]',
    /^(JS|JSX|TS|TSX)$/,
    'TS'
  )
  .option(
    '--formatter [formatter]',
    'Document formatter(jsdoc | esdoc | tsdoc)',
    /^(jsdoc|esdoc|tsdoc)$/,
    'jsdoc'
  )
  .parse(process.argv)

const options = program.opts()

const config = {
  parser: options.parser,
  targetDir: options.targetDir || '',
  targetFile: options.targetFile || '',
  formatter: options.formatter,
  isStdin: options.stdin || false,
  templatePath: options.templatePath || '',
  style: options.style,
  ignores: getIgnores(options.ignores || ''),
  ignorePatterns: options.ignorePatterns || '',
  nest: options.nest || false,
  write: options.write || false,
  scriptTarget: options.scriptTarget,
  scriptKind: options.scriptKind,
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
