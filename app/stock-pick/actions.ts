"use server"

import { getFinanceIndexDataValue } from "@/stock-api/vietstock"
import { INDICATORS, MAX_PERIOD_PER_REQ } from "@/stock-api/vietstock/constants"
import { IEpsBvpsIndicator } from "@/app/stock-pick/types"
import dayjs from "dayjs"
import { IReportNormValue, TCapitalize } from "@/stock-api/vietstock/types"
import { getByPointIndex } from "@/stock-api/vietstock/helpers"
import { HistogramData, Time } from "lightweight-charts"
import { getProfile } from "@/stock-api/fireant"
import { ICBCode } from "@/stock-api/fireant/types"


export async function getEpsBvpsHistory(tickers: string[], quarterCount: number = 20): Promise<Array<IEpsBvpsIndicator>> {
  const uniqueTickers = new Set<string>(tickers)

  const indicatorData: Array<IEpsBvpsIndicator> = []
  for (const ticker of Array.from(uniqueTickers)) {
    const data = await getPeEpsIndicator(ticker.toUpperCase(), quarterCount)
    if (data) {
      indicatorData.push(data)
    }
  }

  return indicatorData
}

export async function getPeEpsIndicator(
  ticker: string,
  numberOfQuarters: number = 20,
): Promise<IEpsBvpsIndicator | null> {
  const tickerProfile = await getProfile(ticker)
  const reportNormValue = await getFinanceIndexDataValue(
    ticker,
    numberOfQuarters,
  )
  const isICBFinancial =
    ICBCode.BANK === tickerProfile.icbCode ||
    ICBCode.SECURITY === tickerProfile.icbCode
  const perShareId = isICBFinancial ? INDICATORS.BVPS.id : INDICATORS.EPS.id
  const perShareRatioId = isICBFinancial ? INDICATORS.PB.id : INDICATORS.PE.id
  const epsBvpsPoints = reportNormValue.data.filter(
    (point) => point.FinanceIndexID === perShareId,
  )
  const pePbPoints = reportNormValue.data.filter(
    (point) => point.FinanceIndexID === perShareRatioId,
  )

  if (epsBvpsPoints.length !== pePbPoints.length) {
    console.error("epsBvpsPoints.length !== pePbPoints.length")
    return null
  }

  const rqGroupCount = Math.ceil(numberOfQuarters / MAX_PERIOD_PER_REQ)
  if (epsBvpsPoints.length !== rqGroupCount) {
    console.error("epsBvpsPoints.length !== rqGroupCount")
    return null
  }

  const indicator: IEpsBvpsIndicator = {
    ticker,
    currency: "VND",
    perShareValues: [],
    perShareRatios: [],
  }

  let year = dayjs()
  for (let i = 0; i < rqGroupCount; i++) {
    const offset = i * MAX_PERIOD_PER_REQ
    const atIndex = year.subtract(numberOfQuarters - offset, "quarter")

    const [perShareNewValues, perShareNewRatios] = fromGroup(
      atIndex,
      epsBvpsPoints[i],
      pePbPoints[i],
    )

    indicator.perShareValues.push(...perShareNewValues)
    indicator.perShareRatios.push(...perShareNewRatios)
  }

  if (ticker === "PNJ") {
    // If ticker is PNJ then remove the 2020 30 June data point
    const errorPoint = dayjs("2020-06-30")
    indicator.perShareValues = indicator.perShareValues.filter(
      (point) => !dayjs.unix(point.time as number).isSame(errorPoint, "day"),
    )
    indicator.perShareRatios = indicator.perShareRatios.filter(
      (point) => !dayjs.unix(point.time as number).isSame(errorPoint, "day"),
    )
  }

  return indicator
}

function fromGroup(
  startQuarter: dayjs.Dayjs,
  epsGroup: TCapitalize<IReportNormValue>,
  peGroup: TCapitalize<IReportNormValue>,
): [HistogramData[], HistogramData[]] {
  const perShareNewValues: HistogramData[] = []
  const perShareNewRatios: HistogramData[] = []
  for (let i = 0; i < MAX_PERIOD_PER_REQ; i++) {
    const eps = getByPointIndex(epsGroup, i)
    const pe = getByPointIndex(peGroup, i)
    if (eps === undefined || pe === undefined) {
      continue
    }

    const time = startQuarter.add(i, "quarter").endOf('quarter').unix() as Time
    const perShareNewValue: HistogramData = {
      time,
      value: eps,
    }
    const perShareNewRatio: HistogramData = {
      time,
      value: pe,
    }
    perShareNewValues.push(perShareNewValue)
    perShareNewRatios.push(perShareNewRatio)
  }
  return [perShareNewValues, perShareNewRatios]
}
