module.exports = {
  generateClassDoc: (doc) => {
    return `/** ${doc.name} */`
  },
  generateInterfaceDoc: (doc) => {
    return `// ${doc.name}`
  },
  generateFunctionDoc: (doc) => {
    return `/** ${doc.name} */`
  },
}
