import { ClassElement, ScriptKind, ScriptTarget, TypeElement } from 'typescript'

export type CompilerOptionProps = {
  scriptTarget: ScriptTarget
  scriptKind: ScriptKind
}

export type ConfigProps = {
  targetDir?: string
  targetFile?: string
  isStdin?: boolean
  formatter: string
  templatePath: string
  style: string
  ignores: string[]
  ignorePatterns: string
  nest: boolean
} & CompilerOptionProps

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
