function delay(callback, ms) {
  let timer = 0
  return () => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
}

export { delay }
