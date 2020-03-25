module.exports = {
  '**/*.ts?(x)': () => [
    'tsc -p tsconfig.json --noEmit',
    'eslint --fix',
  ],
  '*.md': ['prettier --parser markdown --write', 'markdownlint'],
}
