export interface IFinancialData<T> {
  data: Array<T>
}

export interface IReportNorm {
  reportNormId: number
  reportNormName: string
  unit: string
  financeIndexGroupId: number
  financeIndexGroupName: string
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



export type TCapitalize<T> =
  T extends string ? `${Capitalize<T>}` :
  T extends `${infer F}_${infer R}` ? `${Capitalize<F>}_${TCapitalize<R>}` :
  never;

