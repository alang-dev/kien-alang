import { HistogramData } from "lightweight-charts"

export interface IEpsBvpsIndicator {
  ticker: string
  icbCode: string
  currency: string

  // either eps or bvps
  perShareValues: Array<HistogramData>
  // either pe or pb
  perShareRatios: Array<HistogramData>

  // To compare with perShareRatios.
  closedPriceValues: Array<HistogramData>
  closedPriceLatest: number
}
