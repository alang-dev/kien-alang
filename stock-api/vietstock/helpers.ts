import dayjs from "dayjs"
import quarterOfYear from "dayjs/plugin/quarterOfYear"
import { TOKEN_BODY } from "@/stock-api/vietstock/constants"
dayjs.extend(quarterOfYear)

export function buildBodyForGetFinanceIndexDataValue(
  ticker: string,
  offset: number,
  count: number,
  total: number
): string {
  const params = new URLSearchParams()
  params.append("StockCode", ticker)

  const maxIndex = offset + count

  const currentMonth = dayjs()
  let termIndex = 0
  for (let i = offset; i < maxIndex; i++) {
    const yearMonth = currentMonth.subtract(total - i, 'quarter')
    const quarterNum = yearMonth.quarter() + 1
    const quarter = `${yearMonth.year()}-${quarterNum}`

    params.append(`ListTerms[${termIndex}][Index]`, String(i))
    params.append(`ListTerms[${termIndex}][ItemId]`, quarter)
    params.append(`ListTerms[${termIndex}][IsShowData]`, "true")
    params.append(`ListTerms[${termIndex}][YearPeriod]`, quarter.substring(0, 4))

    termIndex++
  }
  params.append("__RequestVerificationToken", TOKEN_BODY)

  return params.toString()
}
