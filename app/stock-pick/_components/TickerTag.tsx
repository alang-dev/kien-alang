'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"


interface ITickerTagProps {
  ticker: string
  onDelete?: (ticker: string) => void
}

export default function TickerTag({ ticker, onDelete }: ITickerTagProps) {
  function handleDelete() {
    onDelete && onDelete(ticker)
  }


  return (
    <div className="rounded-l-full rounded-r-full bg-gray-50 shadow p-2 relative">
      {ticker}

      <Button
        className="absolute -right-2 -top-2 rounded-full w-5 h-5"
        onClick={handleDelete}
        size='icon'
        variant='destructive'
      >
        <XCircle className='w-4 h-4'/>
      </Button>
    </div>
  )
}
