import { IEpsBvpsIndicator } from "@/app/stock-pick/types"
import { isFinancial } from "@/stock-api/fireant/utils"
import { max, median, min } from "mathjs"
import { toVND } from "@/lib/money"
import { useMemo } from "react"

interface IIndicatorCommendationProps {
  data: IEpsBvpsIndicator
}

function IndicatorCommendation({ data }: IIndicatorCommendationProps) {
  const latestPrice = data.closedPriceLatest
  const indicatorTitle = isFinancial(data.icbCode)
    ? "P/B (left) vs. BVPS (right)"
    : "P/E (left) vs. EPS (right)"

  const { medianPrice, maxPrice, minPrice } = useMemo(() => {
    const perShareRatios = data.perShareRatios.map((r) => r.value)
    const perShareValues = data.perShareValues.map((v) => v.value)
    const medianPerShareRatio = median(...perShareRatios)

    const medianPerShareValue = median(...perShareValues)
    const medianPrice = medianPerShareRatio * medianPerShareValue

    const minPerShareValue = min(...perShareValues)
    const minPrice = minPerShareValue * medianPerShareRatio

    const maxPerShareValue = max(...perShareValues)
    const maxPrice = maxPerShareValue * medianPerShareRatio

    return { medianPrice, minPrice, maxPrice }
  }, [data.perShareValues, data.perShareRatios])

  return (
    <div>
      <h2>
        <strong className="italic">{indicatorTitle}</strong> of {data.ticker} of
        latest 20 quarters
      </h2>
      {data.ticker === "PNJ" && (
        <p className="italic">
          Note: PNJ has an error data point in 2020-Q2, therefore we remove it
          to reduce chart error.
        </p>
      )}

      <ul className="w-52">
        <li className="text-right">
          Latest Price: {latestPrice ? <PriceTag price={latestPrice} /> : "Loading..." }
        </li>
        <li className="text-right">
          Median Price: <PriceTag price={medianPrice} />
        </li>
        <li className="text-right">
          Min Price: <PriceTag price={minPrice} />
        </li>
        <li className="text-right">
          Max Price: <PriceTag price={maxPrice} />
        </li>
      </ul>
    </div>
  )
}

function PriceTag({ price }: { price: number }) {
  return <span className="text-right font-mono">{toVND(price)}</span>
}

export default IndicatorCommendation
