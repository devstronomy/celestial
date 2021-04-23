import { br, preInline } from '../dom'

const colors = {
  ink: '#bbbbbb',
  semiMajor: '#ff531e',
  semiMinor: '#0f93d4',
  linearEccentricity: '#1db11d',
  orbitalEccentricity: 'magenta',
}

type StatusInfo = Readonly<[string, string, string]>[]

const tabularize = (statusInfo: StatusInfo) =>
  statusInfo.map((si) => preInline(`${si[0]} : ${si[1]}`, si[2])).join(br())

export { colors, tabularize }
export type { StatusInfo }
