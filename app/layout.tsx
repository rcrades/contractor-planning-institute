import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
})

console.log('Inter font loaded:', inter) // Debug font loading

export const metadata: Metadata = {
  title: "Contractor Planning Institute",
  description: "Learn about selling your construction firm and get personalized next steps",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log('Layout rendering, classes:', `${inter.className} bg-zinc-900 text-white`)
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-900 text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}



import './globals.css'