const hasOwnProperty = Object.prototype.hasOwnProperty

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const has = (obj: any, key: string) => {
  return hasOwnProperty.call(obj, key)
}
