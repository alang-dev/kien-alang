export interface ITickerProfile {
  symbol: string
  icbCode: string
  companyName: string
  shortName: string
  internationalName: string
  headQuarters: string
  phone: string
  fax: string
  email: string
  webAddress: string
  overview: string
  history: string
  businessAreas: string
  employees: number
  branches: number
  establishmentDate: string
  businessLicenseNumber: string
  dateOfIssue: string
  taxIDNumber: string
  charterCapital: number
  dateOfListing: string
  exchange: string
  initialListingPrice: number
  listingVolume: number
  stateOwnership: number
  foreignOwnership: number
  otherOwnership: number
  isListed: boolean
}

export enum ICBCode {
  BANK = "8355",
  SECURITY = "8781",
}
