import { HistogramData } from "lightweight-charts"

export interface IEpsBvpsIndicator {
  ticker: string
  currency: string

  // either eps or bvps
  perShareValues: Array<HistogramData>
  // either pe or pb
  perShareRatios: Array<HistogramData>
}
