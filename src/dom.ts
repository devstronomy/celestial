const getStatusElement = (): HTMLElement => document.getElementById('status') as HTMLElement

const resetStatusElement = (): void => {
  const statusElement = getStatusElement()
  if (statusElement != null) {
    statusElement.innerHTML = ''
  }
}

const br = (): string => `<br/>`

const span = (content: string, color: string): string =>
  `<span style="color: ${color}">${content}</span>`

const preInline = (content: string, color: string): string =>
  `<pre style="display: inline; color: ${color}">${content}</pre>`

export { getStatusElement, resetStatusElement, br, span, preInline }
