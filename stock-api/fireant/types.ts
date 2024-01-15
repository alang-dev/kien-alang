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

export interface IHistoryQuote {
  // ISO date time
  date: string
  symbol: string
  priceHigh: number
  priceLow: number
  priceOpen: number
  priceAverage: number
  priceClose: number
  priceBasic: number
  totalVolume: number
  dealVolume: number
  putthroughVolume: number
  totalValue: number
  putthroughValue: number
  buyForeignQuantity: number
  buyForeignValue: number
  sellForeignQuantity: number
  sellForeignValue: number
  buyCount: number
  buyQuantity: number
  sellCount: number
  sellQuantity: number
  adjRatio: number
  currentForeignRoom: number
  propTradingNetDealValue?: number
  propTradingNetPTValue?: number
  propTradingNetValue?: number
}

export interface ITickerSearch {
  id: string
  type: string
  key: string
  name: string
  description: string
}

export enum ICBCode {
  BANK = "8355",
  SECURITY = "8781",
}
