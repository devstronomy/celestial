function checkDefined(value, errorMessage) {
  if (value === undefined) {
    throw new Error(errorMessage);
  }
}

export { checkDefined };
