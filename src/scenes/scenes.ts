import { br, preInline } from '../dom'

const colors = {
  // basic colors
  dashedLine: '#666666',

  ink: '#bbbbbb',
  semiMajor: '#ff531e',
  semiMinor: '#0f93d4',
  linearEccentricity: '#1db11d',
  orbitalEccentricity: 'magenta',
  aphelion: '#d6d770',
  perihelion: '#e08f62',
}

type StatusInfo = Readonly<[string, string, string]>[]

const tabularize = (statusInfo: StatusInfo) =>
  statusInfo.map((si) => preInline(`${si[0]} : ${si[1]}`, si[2])).join(br())

export { colors, tabularize }
export type { StatusInfo }
