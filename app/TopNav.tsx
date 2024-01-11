"use client"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function TopNav() {
  const pathname = usePathname()

  return (
    <div className="grid grid-cols-[3fr_5fr]">
      <div className="flex flex-col">
        <div className="text-xl font-bold">Kien Alang</div>
        <div className="text-sm">Software Engineer</div>
      </div>

      <div className="flex flex-row content-center gap-2 rounded-l-full rounded-r-full shadow-md">
        <div
          className={clsx("rounded-l-full rounded-r-full p-4", {
            "bg-gray-100 font-medium": pathname === "/stock-pick",
          })}
        >
          <a href="/stock-pick">Stock Picks</a>
        </div>
      </div>
    </div>
  )
}
