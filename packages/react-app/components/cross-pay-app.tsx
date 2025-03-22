"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import SendMoneyForm from "./send-money-form"
import TransactionHistory from "./transaction-history"
import CountrySelector from "./country-selector"
import type { CountryData } from "@/lib/types"

export default function CrossPayApp() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country)
    console.log("Selected country:", country)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="bg-[#1E0E40] backdrop-blur-sm border-none text-white shadow-2xl rounded-2xl">
        <div className="p-6 space-y-6">
          {!showHistory && <CountrySelector onSelectCountry={handleSelectCountry} />}
          
          {showHistory ? (
            <TransactionHistory onBack={() => setShowHistory(false)} />
          ) : (
            <SendMoneyForm 
              selectedCountry={selectedCountry} 
              onHistoryClick={() => setShowHistory(true)}
            />
          )}
        </div>
      </Card>

      <div className="mt-8 text-center text-white/60 text-sm">
        <p>Powered by Celo MiniPay</p>
        <p className="mt-1">Secure, fast cross-border payments across Africa</p>
      </div>
    </div>
  )
}