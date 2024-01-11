import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PropsWithChildren } from "react"
import { TopNav } from "@/app/TopNav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kien Alang",
  description: "Kien Alang's personal website",
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col">
          <div className="sticky top-0 p-6">
            <TopNav />
          </div>

          <div className='p-6'>{props.children}</div>
        </div>
      </body>
    </html>
  )
}
