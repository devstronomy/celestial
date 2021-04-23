import { AU_m } from '../constants'

const kmToAu = (km: number) => (km * 1000) / AU_m

// convert from 10^6 km to AUs.
const km6ToAu = (km6: number) => kmToAu(km6 * 1_000_000)

const auToKm = (au: number) => (au * AU_m) / 1000

const auToKm6 = (au: number) => auToKm(au) / 1_000_000

export { kmToAu, km6ToAu, auToKm, auToKm6 }
