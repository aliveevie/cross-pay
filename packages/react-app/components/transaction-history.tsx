"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockTransactions } from "@/lib/mock-data"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = mockTransactions.filter(
    (tx) => tx.recipient.toLowerCase().includes(searchTerm.toLowerCase()) || tx.amount.toString().includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
        <Input
          type="search"
          placeholder="Search transactions..."
          className="pl-9 bg-white/5 border-white/10 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === "sent" ? "bg-red-500/20" : "bg-green-500/20"}`}
                >
                  {tx.type === "sent" ? (
                    <ArrowUpRight className="h-4 w-4 text-red-400" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{tx.recipient}</p>
                  <p className="text-xs text-white/60">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.type === "sent" ? "text-red-400" : "text-green-400"}`}>
                  {tx.type === "sent" ? "-" : "+"}
                  {tx.amount} {tx.currency}
                </p>
                <p className="text-xs text-white/60">{tx.status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-white/60">
            <p>No transactions found</p>
          </div>
        )}
      </div>

      <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
        View All Transactions
      </Button>
    </div>
  )
}

