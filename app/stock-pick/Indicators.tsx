"use client"

import { TickerAutosuggestion } from "@/app/stock-pick/TickerAutosuggestion"
import { useState } from "react"
import IndicatorChart from "@/app/stock-pick/_components/IndicatorChart"
import { IEpsBvpsIndicator } from "@/app/stock-pick/types"
import { getEpsBvpsHistory } from "@/app/stock-pick/actions"
import IndicatorCommendation from "@/app/stock-pick/_components/IndicatorCommendation"

const _QuarterCount: Readonly<number> = 5 * 4

export function Indicators() {
  const [indicatorData, setIndicatorData] = useState<Array<IEpsBvpsIndicator>>(
    [],
  )

  async function handleShowMarketEvaluation(tickers: Array<string>) {
    setIndicatorData([])
    const res = await getEpsBvpsHistory(tickers, _QuarterCount)
    setIndicatorData(res)
  }

  function handleRemoveTicker(ticker: string) {
    setIndicatorData((prevState) =>
      prevState.filter((data) => data.ticker !== ticker),
    )
  }

  return (
    <div className="mt-4">
      <div>
        <TickerAutosuggestion
          showMarketEvaluation={handleShowMarketEvaluation}
          handleRemoveTicker={handleRemoveTicker}
        />
      </div>
      {indicatorData.map((data) => {
        return (
          <div key={data.ticker} className='mt-4 grid grid-cols-[1fr_3fr]'>
            <IndicatorCommendation data={data} />
            <IndicatorChart data={data} />
          </div>
        )
      })}
    </div>
  )
}
