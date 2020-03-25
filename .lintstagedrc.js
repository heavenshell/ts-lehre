module.exports = {
  '**/*.ts?(x)': () => [
    'tsc -p tsconfig.json --noEmit',
    'eslint --fix',
    'git add',
  ],
  '*.md': ['prettier --parser markdown --write', 'textlint', 'markdownlint'],
}
