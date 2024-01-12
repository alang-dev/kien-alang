"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { searchTicker } from "@/stock-api/fireant"
import { ITickerSearch } from "@/stock-api/fireant/types"
import TickerTag from "@/app/stock-pick/_components/TickerTag"

interface ITickerAutoSuggestionProps {
  showMarketEvaluation?: (tickers: Array<string>) => void
  handleRemoveTicker?: (ticker: string) => void
}

export function TickerAutosuggestion(props: ITickerAutoSuggestionProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [tickers, setTickers] = React.useState<Array<string>>([])

  const [isSearching, setIsSearching] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<
    Array<ITickerSearch>
  >([])

  function handleTriggerOpenChange(open: boolean) {
    setOpen(open)
    setSearchResults([])
  }

  function handleTickerSelect(ticker: string) {
    const fmtTicker = ticker.toUpperCase()
    if (tickers.includes(fmtTicker)) {
      return
    }
    setTickers((prevState) => [...prevState, fmtTicker])
    setSearchResults([])
    searchInputRef.current?.value && (searchInputRef.current.value = "")
  }

  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null)

  function handleTickerInput(event: React.ChangeEvent<HTMLInputElement>) {
    const ticker = event.target.value.trim()
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    if (ticker.length < 2) {
      setIsSearching(false)
      return
    }

    timeoutIdRef.current = setTimeout(() => {
      setIsSearching(true)
      searchTicker(ticker).then((results) => {
        setSearchResults(results)
        setIsSearching(false)
      })
    }, 500)
  }

  function handleDeleteTicker(ticker: string) {
    setTickers((prevState) => prevState.filter((tk) => tk !== ticker))
    props.handleRemoveTicker?.(ticker)
  }

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Tickers</p>
      <div className="flex items-center space-x-4">
        {tickers.map((ticker) => (
          <TickerTag
            key={ticker}
            ticker={ticker}
            onDelete={handleDeleteTicker}
          />
        ))}
      </div>
      <Popover open={open} onOpenChange={handleTriggerOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            + Add Ticker
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput
              placeholder="Search Ticker..."
              onChangeCapture={handleTickerInput}
              ref={searchInputRef}
              isLoading={isSearching}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {searchResults.map((searchRs) => (
                  <CommandItem
                    key={searchRs.key}
                    value={searchRs.key}
                    onSelect={handleTickerSelect}
                  >
                    <span>{searchRs.key}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {tickers.length > 0 && (
        <Button variant="outline" size="sm" onClick={() => props.showMarketEvaluation?.(tickers)}>
          Show Market Evaluation
        </Button>
      )}
    </div>
  )
}
