import { Indicators } from "@/app/stock-pick/Indicators"

export default async function StockPick(props: IServerPropsDefault) {
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

      <Indicators />
    </div>
  )
}
