import { BASE_URL, HEADERS, MAX_PERIOD_PER_REQ } from "@/stock-api/vietstock/constants"
import { buildBodyForGetFinanceIndexDataValue } from "@/stock-api/vietstock/helpers"
import { IFinancialData, IReportNormValue, TCapitalize } from "@/stock-api/vietstock/types"

export async function getFinanceIndexDataValue(ticker: string, numberOfQuarters: number = 20) {
  const times = Math.ceil(numberOfQuarters / MAX_PERIOD_PER_REQ)
  const reportNormValue: IFinancialData<TCapitalize<IReportNormValue>> = {
    data: [],
  }
  for (let i = 0; i < times; i++) {
    const offset = i * MAX_PERIOD_PER_REQ
    const limit = Math.min(MAX_PERIOD_PER_REQ, numberOfQuarters - offset + 1)
    const body = buildBodyForGetFinanceIndexDataValue(ticker, offset, limit, numberOfQuarters)
    const requestOptions: RequestInit = {
      method: "POST",
      headers: HEADERS,
      body,
    }
    const response = await fetch(`${BASE_URL}/GetFinanceIndexDataValue_CSTC_ByListTerms`, requestOptions)
    const data: IFinancialData<TCapitalize<IReportNormValue>> = await response.json()
    reportNormValue.data.push(...data.data)
  }
  return reportNormValue
}
