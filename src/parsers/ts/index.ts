import {
  BinaryExpression,
  createSourceFile,
  ExpressionStatement,
  forEachChild,
  isClassDeclaration,
  isInterfaceDeclaration,
  isFunctionDeclaration,
  isTypeAliasDeclaration,
  Node as TsNode,
  ScriptKind,
  ScriptTarget,
  SyntaxKind,
  VariableStatement,
} from 'typescript'

import { getClassLikeDoc } from './classes'
import { getVariableDocFromExpression } from './expressions'
import { getFunctionDoc } from './functions'
import { getTypeDoc } from './types'
import { getVariableDoc } from './variables'

import { DocProps, ParseProps } from '../../types'

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

export const getLineAndPosition = (lines: string[]) => (lineno: number) => {
  if (lines[lineno]) {
    const line = lines[lineno]
    return { line: lineno, column: line.search(/[A-z0-9_]/) }
  }
  return { line: lineno, column: 0 }
}

export const parse = ({
  code,
  lines,
  nest,
  scriptTarget,
  scriptKind,
}: ParseProps) => {
  const source = createSourceFile(
    'lehre.ts',
    code,
    getTarget(scriptTarget || 'esnext'),
    false,
    getKind(scriptKind || 'ts')
  )

  const docs: DocProps[] = []
  const visit = (node: TsNode) => {
    switch (node.kind) {
      case SyntaxKind.FunctionDeclaration:
        if (node.hasOwnProperty('jsDoc')) {
          break
        }
        if (isFunctionDeclaration(node) && node.name) {
          docs.push(getFunctionDoc(node, source))
        }
        if (!nest) {
          return
        }
        break
      case SyntaxKind.VariableStatement:
        if (node.hasOwnProperty('jsDoc')) {
          break
        }
        if (node.hasOwnProperty('declarationList')) {
          const start = source.getLineAndCharacterOfPosition(
            node.getStart(source)
          )
          const end = source.getLineAndCharacterOfPosition(node.getEnd())

          const declarations = (node as VariableStatement).declarationList
            .declarations
          declarations.forEach((d) => {
            const doc = getVariableDoc(
              d,
              source,
              { line: start.line, column: start.character },
              { line: end.line, column: end.character }
            )
            docs.push(doc)
          })
          if (!nest) {
            return
          }
        }
        break
      case SyntaxKind.TypeAliasDeclaration:
        if (node.hasOwnProperty('jsDoc')) {
          break
        }
        if (isTypeAliasDeclaration(node)) {
          const typeDoc = getTypeDoc(node, source)
          typeDoc.type = 'interface'
          docs.push(typeDoc)
          return
        }
        break
      case SyntaxKind.InterfaceDeclaration:
        if (node.hasOwnProperty('jsDoc')) {
          break
        }
        if (isInterfaceDeclaration(node) && node.name) {
          const interfaceDoc = getClassLikeDoc(
            node,
            source,
            getLineAndPosition(lines)
          )
          interfaceDoc.type = 'interface'
          docs.push(interfaceDoc)
          return
        }
        if (!nest) {
          return
        }
        break
      case SyntaxKind.ClassDeclaration:
        if (node.hasOwnProperty('jsDoc')) {
          break
        }
        if (isClassDeclaration(node) && node.name) {
          const classDoc = getClassLikeDoc(
            node,
            source,
            getLineAndPosition(lines)
          )
          classDoc.type = 'class'
          docs.push(classDoc)
        }
        if (!nest) {
          return
        }
        break
      case SyntaxKind.ExpressionStatement:
        if (node.hasOwnProperty('expression')) {
          const { expression } = node as ExpressionStatement
          if (
            expression &&
            expression.hasOwnProperty('left') &&
            expression.hasOwnProperty('right')
          ) {
            const { right } = expression as BinaryExpression
            if (right.hasOwnProperty('parameters')) {
              const doc = getVariableDocFromExpression(expression, source)
              doc.type = 'function'
              docs.push(doc)
            }
            if (!nest) {
              return
            }
          }
        }
        break
    }
    forEachChild(node, visit)
  }

  visit(source)
  return docs
}
