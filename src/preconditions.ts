function check(condition: boolean, errorMessage: string): void {
  if (!condition) {
    throw new Error(errorMessage)
  }
}

function checkDefined<T>(value: T | null | undefined, errorMessage: string): T {
  if (value == undefined) {
    throw new Error(errorMessage)
  }
  return value
}

export { check, checkDefined }
