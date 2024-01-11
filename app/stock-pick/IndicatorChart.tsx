"use client"

import {
  createChart,
  DeepPartial,
  IChartApi, LineType,
  TimeChartOptions
} from "lightweight-charts"
import { useEffect, useRef } from "react"
import { IEpsBvpsIndicator } from "@/app/stock-pick/types"

interface IIndicatorChartProps {
  data: IEpsBvpsIndicator
}
const chartOptions: DeepPartial<TimeChartOptions> = {
  layout: { textColor: "black", background: { color: "white" } },
  leftPriceScale: { visible: true },
  rightPriceScale: { visible: true },
}

const intl = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
})
function toVND(price: number) {
  return intl.format(price)
}

function IndicatorChart(props: IIndicatorChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { perShareValues, perShareRatios } = props.data

  useEffect(() => {
    if (!chartContainerRef.current) {
      return
    }
    chartRef.current = createChart(chartContainerRef.current, chartOptions)
    chartRef.current.timeScale().fitContent()
    chartRef.current.applyOptions({
      watermark: {
        color: "rgba(0, 0, 0, 0.8)",
        visible: true,
        text: props.data.ticker,
        fontSize: 24,
        horzAlign: "left",
        vertAlign: "top",
      },
    })

    return () => {
      chartRef.current?.remove()
      chartRef.current = null
    }
  }, [props.data.ticker])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }
    const histogramSeries = chartRef.current.addHistogramSeries({
      color: "rgba(38, 166, 154, 0.3)",
      priceScaleId: "right",
      priceFormat: {
        type: "custom",
        formatter: toVND,
      }
    })
    histogramSeries.setData(perShareValues)
  }, [perShareValues])

  useEffect(() => {
    if (!chartRef.current) {
      return
    }
    const lineSeries = chartRef.current.addLineSeries({
      color: "rgb(1,82,82)",
      lineWidth: 1,
      priceScaleId: "left",
      lineType: LineType.Curved,
    })
    lineSeries.setData(perShareRatios)
  }, [perShareRatios])

  return <div ref={chartContainerRef} className="w-full min-h-80" />
}

export default IndicatorChart
