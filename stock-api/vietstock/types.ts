export interface IFinancialData<T> {
  data: Array<T>
}
export interface IReportNormValue {
  financeIndexID: number
  value1: number
  value2: number
  value3: number
  value4: number
  value5: number
  value6: number
  value7: number
  value8: number
  value9: number
}

export type TCapitalize<T extends Record<string, any>> = {
  [K in keyof T as Capitalize<string & K>]: T[K]
}

export interface IIndicator {
  id: number
  name: string
  unit: string
}
