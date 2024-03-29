import { IIndicator } from "@/stock-api/vietstock/types"

export const BASE_URL: Readonly<string> = "https://finance.vietstock.vn/data"
export const COOKIE: Readonly<string> = "ASP.NET_SessionId=fba0bwjrugx5y2hnoayq4fny; __RequestVerificationToken=iWKkgmpyznjSLwoBLiJRryeXubktTyFjzjacepg-iuapFzPHuhQuITBeICBM4Sbqsf78zBLyYaWlthkabFXM60fu3Ft87EdsJyM71jmdgE81; fileDownload=true; language=vi-VN; Theme=Light; vts_usr_lg=E3BC03167FAD7BD499573689DFCC27892CA7339F418CA55AE869C2186E2E022777990400969F514F0BB751BD3B7585641B10C30680EC50965EFDB5E050C0CDFCE41F747837AD3AB9796C5E655E8C36C04896D4C66F2352D0CDBB9040D18CC23C8CA8F95E5A4101E803538DA2E4DABDA8CD36E8BF395F484CC9840F18A1B3E8ED; finance_viewedstock=TNG,HTG,; vts_usr_lg=855AE9819949B523190ACCD873BA7119F66A2C863CF6C9253A41C5B8A30E9CF6A9076B61866F1CB5E2EA4C3F549F78590B987F728BAD5B9C895E0049B4A13E7867A4512290D79223E30DDA0F962A7F6415604CECF54BC911E981346F63BE2F6E84DF7ECB00516C532A18F0491775494A0E9FEE06F7E38404A0C605953B1413A4"
export const TOKEN_BODY: Readonly<string> = "MZsjxeXez4IqLeKHWrXArmcGFmPReFLs9A2uWIyxVywptj6pRLkIBMt5k16BX0dT0si9kG25-EfpYDGpMVp4NCWOvo6cSSw_cp4FQwRo4noqeh3vAi_FGDs5EYJPGCLU0"
export const HEADERS: Readonly<Headers> = new Headers([
  ["Accept", "*/*"],
  ["Accept-Language", "en;q=0.8"],
  ["Connection", "keep-alive"],
  ["Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"],
  ["Cookie", COOKIE],
  ["Accept-Encoding", "*"],
  ["Origin", "https://finance.vietstock.vn"],
])

export const MAX_PERIOD_PER_REQ: Readonly<number> = 9

export const INDICATORS: Record<string, IIndicator> = {
  EPS: { id: 53, name: "EPS", unit: "VNĐ" },
  BVPS: { id: 54, name: "BVPS", unit: "VNĐ" },
  PE: { id: 55, name: "P/E", unit: "Lần" },
  PB: { id: 57, name: "P/B", unit: "Lần" },
}
