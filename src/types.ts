import { ClassElement, TypeElement } from 'typescript'

type Target =
  | 'es3'
  | 'es5'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'esnext'
type Kind = 'js' | 'jsx' | 'ts' | 'tsx'

export type CompilerOptionProps = {
  scriptTarget: Target
  scriptKind: Kind
}

export type ConfigProps = {
  parser: 'babel' | 'ts'
  targetDir?: string
  targetFile?: string
  isStdin?: boolean
  formatter: string
  templatePath: string
  style: string
  ignores: string[]
  ignorePatterns: string
  nest: boolean
  write: boolean
} & CompilerOptionProps

export type ParseProps = {
  code: string
  lines: string[]
  nest?: boolean
  scriptTarget?: Target
  scriptKind?: Kind
}

export type LineProps = {
  line: number
  column: number
}

export type ParamProps = {
  name: string
  type: string
  default: string
  alias: string
}

export type FunctionDocProps = {
  name: string
  type: string
  start: LineProps
  end: LineProps
  params: ParamProps[]
  returnType: string
}

export type HeritageClauseProps = {
  type: string
  value: string
}

export type ClassDocProps = {
  name: string
  type: string
  start: LineProps
  end: LineProps
  methods: FunctionDocProps[]
  heritageClauses: HeritageClauseProps[]
}

export type MemberProps = ClassElement | TypeElement

export type DocProps = {
  name: string
  type: string
  start: LineProps
  end: LineProps
  methods?: FunctionDocProps[]
  params?: ParamProps[]
  heritageClauses?: HeritageClauseProps[]
}

export type OutputProps = {
  doc: string
  start: LineProps
  end: LineProps
  type: string
}
