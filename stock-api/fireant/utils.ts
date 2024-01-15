import { ICBCode } from "@/stock-api/fireant/types"

export function isFinancial(icbCode: string) {
  return icbCode === ICBCode.BANK || icbCode === ICBCode.SECURITY
}
