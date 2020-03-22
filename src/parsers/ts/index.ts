import {
  createSourceFile,
  forEachChild,
  isClassDeclaration,
  isInterfaceDeclaration,
  isFunctionDeclaration,
  Node as TsNode,
  SyntaxKind,
  VariableStatement,
} from 'typescript'

import { getClassLikeDoc } from './classes'
import { getFunctionDoc } from './functions'
import { getVariableDoc } from './variables'

import { DocProps, CompilerOptionProps } from '../../types'

export const getLineAndPosition = (lines: string[]) => (lineno: number) => {
  if (lines[lineno]) {
    const line = lines[lineno]
    return { line: lineno, character: line.search(/[A-z0-9_]/) }
  }
  return { line: lineno, character: 0 }
}

export const parse = (
  code: string,
  lines: string[],
  nest: boolean,
  options: CompilerOptionProps
) => {
  const source = createSourceFile(
    'lehre.ts',
    code,
    options.scriptTarget,
    false,
    options.scriptKind
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
          declarations.forEach(d => {
            const doc = getVariableDoc(d, source, start, end)
            docs.push(doc)
          })
          if (!nest) {
            return
          }
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
    }
    forEachChild(node, visit)
  }

  visit(source)
  return docs
}
