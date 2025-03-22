"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import SendMoneyForm from "./send-money-form"
import TransactionHistory from "./transaction-history"
import CountrySelector from "./country-selector"
import type { CountryData } from "@/lib/types"
import { PaymentDetails } from "./payment-processing"
import { mockTransactions } from "@/lib/mock-data"

export default function CrossPayApp() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [transactions, setTransactions] = useState<PaymentDetails[]>([])

  // Initialize with mock transactions
  useEffect(() => {
    setTransactions(mockTransactions)
  }, [])

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country)
    console.log("Selected country:", country)
  }

  const handleTransactionComplete = (newTransaction: PaymentDetails) => {
    setTransactions(prev => [newTransaction, ...prev])
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="bg-[#1E0E40] backdrop-blur-sm border-none text-white shadow-2xl rounded-2xl">
        <div className="p-6 space-y-6">
          {!showHistory && <CountrySelector onSelectCountry={handleSelectCountry} />}
          
          {showHistory ? (
            <TransactionHistory 
              onBack={() => setShowHistory(false)} 
              transactions={transactions}
            />
          ) : (
            <SendMoneyForm 
              selectedCountry={selectedCountry} 
              onHistoryClick={() => setShowHistory(true)}
              onTransactionComplete={handleTransactionComplete}
            />
          )}
        </div>
      </Card>
    </div>
  )
}