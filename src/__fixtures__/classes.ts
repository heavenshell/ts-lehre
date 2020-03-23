interface Props {
  arg1: string
}
export class Foo {
  props: Props = { arg1: '' }
  arg1: string
  constructor(arg1: string) {
    this.arg1 = arg1
  }

  foo(arg1: string) {
    const bar = (arg2: string): string => {
      return arg2
    }
    return bar(arg1)
  }
}
