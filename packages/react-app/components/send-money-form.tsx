"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import type { CountryData } from "@/lib/types"

interface SendMoneyFormProps {
  selectedCountry: CountryData | null
  onHistoryClick: () => void
}

export default function SendMoneyForm({ selectedCountry, onHistoryClick }: SendMoneyFormProps) {
  const [amount, setAmount] = useState("")
  const [phone, setPhone] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          onClick={() => {}} 
          className="bg-[#4ADE80] hover:bg-[#3EBE6F] text-white px-8 py-2 rounded-lg"
          title="Send Money"
        >
          Send Money
        </Button>
        <button 
          onClick={onHistoryClick}
          className="text-[#6F6D7B] hover:text-white transition-colors"
        >
          History
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-white/80 text-sm">Amount</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-[#2D2A3E] text-white border-white/10 focus:border-white/20 rounded-lg"
          />
          <div className="w-24 px-4 py-2 bg-[#2D2A3E] text-white rounded-lg flex items-center justify-between">
            cUSD
            <ArrowRight size={16} className="opacity-50" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-white/80 text-sm">Recipient Phone Number</label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 000 0000"
          className="w-full bg-[#2D2A3E] text-white border-white/10 focus:border-white/20 rounded-lg"
        />
      </div>

      <Button 
        onClick={() => {}}
        className="w-full bg-[#4ADE80] hover:bg-[#3EBE6F] text-white py-3 rounded-lg flex items-center justify-center gap-2 mt-4"
        title="Send Money"
      >
        Send Money
        <ArrowRight size={20} />
      </Button>
    </div>
  )
}

