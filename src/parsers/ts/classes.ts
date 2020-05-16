import {
  ClassLikeDeclarationBase,
  Identifier,
  InterfaceDeclaration,
  ParameterDeclaration,
  NodeArray,
  SourceFile,
  SyntaxKind,
} from 'typescript'

import { getParameter } from './parameters'

import { has } from '../helpers'
import {
  ClassDocProps,
  FunctionDocProps,
  LineProps,
  MemberProps,
} from '../../types'

export const getClassLikeDoc = (
  node: ClassLikeDeclarationBase | InterfaceDeclaration,
  source: SourceFile,
  getLineAndPosition: (lineno: number) => LineProps
): ClassDocProps => {
  const start = source.getLineAndCharacterOfPosition(node.getStart(source))
  const end = source.getLineAndCharacterOfPosition(node.getEnd())

  const classDoc: ClassDocProps = {
    name: node.name ? node.name.text : '',
    type: '',
    start: { line: start.line, column: start.character },
    end: { line: end.line, column: end.character },
    methods: [],
    heritageClauses: [],
  }

  switch (node.kind) {
    case SyntaxKind.InterfaceDeclaration:
      classDoc.type = 'interface'
      break
    case SyntaxKind.ClassDeclaration:
      classDoc.type = 'class'
      break
  }

  if (node.heritageClauses) {
    const heritageClauses = node.heritageClauses.map((n) => {
      const value = n.getText(source)
      const values = value.split(' ')
      if (values.length >= 3) {
        return { type: values[0], value: values.slice(1).join(' ') }
      }
      return { type: values[0], value: values[1] }
    })
    classDoc.heritageClauses = heritageClauses
  }

  const members = node.members as NodeArray<MemberProps>
  classDoc.methods = members.map((member) => {
    const position = source.getLineAndCharacterOfPosition(
      member.getStart(source)
    )
    const start = getLineAndPosition(position.line)
    const end = source.getLineAndCharacterOfPosition(member.getEnd())

    const doc: FunctionDocProps = {
      name: '',
      type: 'function',
      start,
      end: { line: end.line, column: end.character },
      params: [],
      returnType: '',
    }

    switch (member.kind) {
      case SyntaxKind.Constructor:
        doc.name = 'constructor'
        break
      case SyntaxKind.PropertySignature:
      case SyntaxKind.PropertyDeclaration:
        doc.name = (member.name as Identifier).escapedText.toString()
        doc.type = 'property'
        break
      case SyntaxKind.MethodDeclaration:
      case SyntaxKind.MethodSignature:
        doc.name = (member.name as Identifier).escapedText.toString()
        break
    }
    if (has(member, 'parameters')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parameters: NodeArray<ParameterDeclaration> = (member as any)
        .parameters
      doc.params = parameters.map((p) => {
        return getParameter(p, source)
      })
    }
    if (has(member, 'type')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const type = (member as any).type
      if (type) {
        doc.returnType = type.getText(source)
      }
    }

    return doc
  })

  return classDoc
}
