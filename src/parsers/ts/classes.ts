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
) => {
  const classDoc: ClassDocProps = {
    name: node.name ? node.name.text : '',
    type: '',
    start: source.getLineAndCharacterOfPosition(node.getStart(source)),
    end: source.getLineAndCharacterOfPosition(node.getEnd()),
    methods: [],
    heritageClauses: [],
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

    const doc: FunctionDocProps = {
      name: '',
      type: 'function',
      start,
      end: source.getLineAndCharacterOfPosition(member.getEnd()),
      params: [],
      returnType: '',
    }

    switch (member.kind) {
      case SyntaxKind.Constructor:
        doc.name = 'Constructor'
        break
      case SyntaxKind.PropertyDeclaration:
        doc.name = (member.name as Identifier).escapedText.toString()
        doc.type = 'property'
        break
      case SyntaxKind.MethodDeclaration:
      case SyntaxKind.MethodSignature:
        doc.name = (member.name as Identifier).escapedText.toString()
        break
    }
    if (member.hasOwnProperty('parameters')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parameters: NodeArray<ParameterDeclaration> = (member as any)
        .parameters
      doc.params = parameters.map((p) => {
        return getParameter(p, source)
      })
    }
    if (member.hasOwnProperty('type')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      doc.returnType = (member as any).type.getText(source)
    }

    return doc
  })
  return classDoc
}
