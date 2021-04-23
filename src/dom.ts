import { checkDefined } from './preconditions'

const getHeaderElement: () => HTMLElement = () =>
  checkDefined(document.getElementById('header'), 'header element')

const getStatusElement = (): HTMLElement => document.getElementById('status') as HTMLElement

const resetStatusElement = (): void => {
  getStatusElement().innerHTML = ''
}

const br = (): string => `<br/>`

const span = (content: string, color: string): string =>
  `<span style="color: ${color}">${content}</span>`

const preInline = (content: string, color: string): string =>
  `<pre style="display: inline; color: ${color}">${content}</pre>`

export { getHeaderElement, getStatusElement, resetStatusElement, br, span, preInline }
