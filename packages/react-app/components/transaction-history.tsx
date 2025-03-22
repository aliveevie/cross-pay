"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockTransactions } from "@/lib/mock-data"
import { formatAmount } from "@/lib/utils"
import { PaymentDetails } from "./payment-processing"

interface TransactionHistoryProps {
  onBack: () => void;
  transactions?: PaymentDetails[];
}

export default function TransactionHistory({ onBack, transactions = mockTransactions }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = transactions.filter(
    (tx) => tx.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tx.amount.toString().includes(searchTerm)
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

      <div className="relative">
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#2D2A3E] text-white border-white/10 focus:border-white/20 rounded-lg pl-10"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {filteredTransactions.length > 0 ? (
        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <div key={tx.txHash} className="bg-[#2D2A3E] rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{tx.recipientName}</h3>
                  <p className="text-sm text-white/60">{tx.date.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-[#4ADE80]">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>{formatAmount(tx.amount)} {tx.currency}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1 font-mono truncate max-w-[140px]">{tx.txHash?.substring(0, 10)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-white/60">
          <p>{searchTerm ? "No transactions found" : "Your transactions will appear here"}</p>
        </div>
      )}
    </div>
  )
}

