export function staticImplements<T>() {
  return <U extends T>(constructor: U): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    constructor;
  };
}
