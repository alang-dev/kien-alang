import { ITickerProfile, ITickerSearch } from "@/stock-api/fireant/types"
import { BASE_URL, HEADERS } from "@/stock-api/fireant/constants"

export async function getProfile(ticker: string): Promise<ITickerProfile> {
  const url = new URL(`${BASE_URL}/symbols/${ticker}/profile`)
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: HEADERS
  })

  return response.json()
}

export async function searchTicker(query: string): Promise<ITickerSearch[]> {
  const searchParams = new URLSearchParams({
    keywords: query,
    type: "symbol",
    offset: "0",
    limit: "20"
  })
  const url = new URL(`${BASE_URL}/search?${searchParams.toString()}`)
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: HEADERS
  })

  return response.json()
}
