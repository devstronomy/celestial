function checkDefined<T>(value: T | null | undefined, errorMessage: string): T {
  if (value == undefined) {
    throw new Error(errorMessage)
  }
  return value
}

export { checkDefined }
