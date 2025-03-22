"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockTransactions } from "@/lib/mock-data"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

interface TransactionHistoryProps {
  onBack: () => void;
}

export default function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = mockTransactions.filter(
    (tx) => tx.recipient.toLowerCase().includes(searchTerm.toLowerCase()) || tx.amount.toString().includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Transaction History</h2>
        <button 
          onClick={onBack}
          className="text-[#4ADE80] hover:text-[#3EBE6F] transition-colors"
        >
          Back
        </button>
      </div>
      
      <div className="text-center py-8 text-white/60">
        <p>Your transactions will appear here</p>
      </div>
    </div>
  )
}

