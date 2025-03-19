"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info } from "lucide-react"
import type { CountryData } from "@/lib/types"
import { currencies } from "@/lib/currencies"
import { ArrowRightIcon } from "@radix-ui/react-icons"

interface SendMoneyFormProps {
  selectedCountry: CountryData | null
}

export default function SendMoneyForm({ selectedCountry }: SendMoneyFormProps) {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("cUSD")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message or redirect
      alert("Transaction initiated successfully!")
    }, 2000)
  }

  const calculateFee = () => {
    const amountNum = Number.parseFloat(amount) || 0
    return (amountNum * 0.01).toFixed(2) // 1% fee
  }

  const calculateTotal = () => {
    const amountNum = Number.parseFloat(amount) || 0
    const feeNum = Number.parseFloat(calculateFee())
    return (amountNum + feeNum).toFixed(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-white/80">
          Amount
        </Label>
        <div className="flex gap-2">
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
            required
          />
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[110px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="bg-[#2D0B5A] border-white/10 text-white">
              {currencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient" className="text-white/80">
          Recipient Phone Number
        </Label>
        <Input
          id="recipient"
          type="tel"
          placeholder="+234 800 000 0000"
          value={recipientPhone}
          onChange={(e) => setRecipientPhone(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
          required
        />
      </div>

      {selectedCountry && (
        <div className="p-3 rounded-lg bg-white/5 flex items-start gap-2">
          <Info size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-white/80">
            <p>
              Sending to <span className="font-medium text-white">{selectedCountry.name}</span>
            </p>
            <p className="mt-1">Local currency: {selectedCountry.currency}</p>
          </div>
        </div>
      )}

      {amount && Number.parseFloat(amount) > 0 && (
        <div className="space-y-2 p-3 rounded-lg bg-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-white/80">Amount:</span>
            <span className="text-white">
              {Number.parseFloat(amount).toFixed(2)} {currency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/80">Fee:</span>
            <span className="text-white">
              {calculateFee()} {currency}
            </span>
          </div>
          <div className="border-t border-white/10 my-1 pt-1"></div>
          <div className="flex justify-between font-medium">
            <span className="text-white/80">Total:</span>
            <span className="text-white">
              {calculateTotal()} {currency}
            </span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white"
        disabled={isLoading || !amount || !recipientPhone}
      >
        {isLoading ? "Processing..." : "Send Money"}
        {!isLoading && <ArrowRightIcon className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  )
}

