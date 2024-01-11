import dayjs from "dayjs"
import quarterOfYear from "dayjs/plugin/quarterOfYear"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { TOKEN_BODY } from "@/stock-api/vietstock/constants"
import { IReportNormValue, TCapitalize } from "@/stock-api/vietstock/types"

dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)

export function buildBodyForGetFinanceIndexDataValue(
  ticker: string,
  offset: number,
  count: number,
  total: number,
): string {
  const params = new URLSearchParams()
  params.append("StockCode", ticker)

  const maxIndex = offset + count

  const currentMonth = dayjs()
  let termIndex = 0
  for (let i = offset; i < maxIndex; i++) {
    const yearMonth = currentMonth.subtract(total - i, "quarter")
    const quarterNum = yearMonth.quarter() + 1
    const quarter = `${yearMonth.year()}-${quarterNum}`

    params.append(`ListTerms[${termIndex}][Index]`, String(i))
    params.append(`ListTerms[${termIndex}][ItemId]`, quarter)
    params.append(`ListTerms[${termIndex}][IsShowData]`, "true")
    params.append(
      `ListTerms[${termIndex}][YearPeriod]`,
      quarter.substring(0, 4),
    )

    termIndex++
  }
  params.append("__RequestVerificationToken", TOKEN_BODY)

  return params.toString()
}

export function getByPointIndex(
  data: TCapitalize<IReportNormValue>,
  index: number,
): number | undefined {
  let value: number | null | undefined
  switch (index) {
    case 0:
      value = data.Value1
      break
    case 1:
      value = data.Value2
      break
    case 2:
      value = data.Value3
      break
    case 3:
      value = data.Value4
      break
    case 4:
      value = data.Value5
      break
    case 5:
      value = data.Value6
      break
    case 6:
      value = data.Value7
      break
    case 7:
      value = data.Value8
      break
    case 8:
      value = data.Value9
      break
  }
  if (value === null || value === undefined) {
    return undefined
  }
  return value
}
