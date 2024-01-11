import IndicatorChart from "@/app/stock-pick/IndicatorChart"
import { getEpsBvpsHistory } from "@/app/stock-pick/services"
import { IEpsBvpsIndicator } from "@/app/stock-pick/types"
import { Fragment } from "react"

const _QuarterCount: Readonly<number> = 5 * 4

export default async function StockPick(props: IServerPropsDefault) {
  const { searchParams = {} } = props
  const { ticker } = searchParams
  const indicatorData: Array<IEpsBvpsIndicator> = await getEpsBvpsHistory(ticker, _QuarterCount)

  return (
    <div>
      <div>
        <h2 className="font-semibold">Term: Stock Pick</h2>
        <ul className="list-disc">
          <li>
            Stock picks are stock selections made by investors using systematic
            analysis of various factors affecting stocks.
          </li>
          <li>
            When picking a stock, investors and analysts study a company&apos;s
            financial statements, looking at key line items and financial
            ratios.
          </li>
          <li>
            Investors and analysts also study the industry and sector of a
            company as a whole and its peers before making a stock pick.
          </li>
        </ul>
        <blockquote className="italic">- by Investopedia</blockquote>
      </div>

      <div className="mt-4">
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
    </div>
  )
}
