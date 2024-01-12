"use client"

import { TickerAutosuggestion } from "@/app/stock-pick/TickerAutosuggestion"
import { Fragment, useState } from "react"
import IndicatorChart from "@/app/stock-pick/IndicatorChart"
import { IEpsBvpsIndicator } from "@/app/stock-pick/types"
import { getEpsBvpsHistory } from "@/app/stock-pick/actions"

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
    setIndicatorData((prevState) => prevState.filter((data) => data.ticker !== ticker))
  }

  return (
    <div className="mt-4">
      <div>
        <TickerAutosuggestion
          showMarketEvaluation={handleShowMarketEvaluation}
          handleRemoveTicker={handleRemoveTicker}
        />
      </div>
      {indicatorData.length > 0 && (
        <h2 className="font-semibold">
          PE/PB of last {_QuarterCount} quarters
        </h2>
      )}
      {indicatorData.map((data) => {
        return (
          <Fragment key={data.ticker}>
            {data.ticker === "PNJ" && (
              <p className="italic">
                Note: PNJ has an error data point in 2020-Q2, therefore we
                remove it to reduce chart error.
              </p>
            )}
            <IndicatorChart data={data} />
          </Fragment>
        )
      })}
    </div>
  )
}
