import { has } from './helpers'

describe('helpers', () => {
  it('has', () => {
    expect(has({}, 'hasOwnProperty')).toBeFalsy()
    expect(has(Object.prototype, 'hasOwnProperty')).toBeTruthy()
    const foo = { bool: false }
    expect(has(foo, 'bool')).toBeTruthy()
  })
})
