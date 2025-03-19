"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import SendMoneyForm from "./send-money-form"
import TransactionHistory from "./transaction-history"
import CountrySelector from "./country-selector"
import type { CountryData } from "@/lib/types"

export default function CrossPayApp() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
   

      <Card className="mt-6 bg-white/10 backdrop-blur-md border-none text-white shadow-xl">
        <div className="p-4">
          <CountrySelector onSelectCountry={setSelectedCountry} />

          <Tabs defaultValue="send" className="mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="send" className="data-[state=active]:bg-primary">
                Send Money
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-primary">
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="send" className="mt-4">
              <SendMoneyForm selectedCountry={selectedCountry} />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <TransactionHistory />
            </TabsContent>
          </Tabs>
        </div>
      </Card>

      <div className="mt-8 text-center text-white/60 text-sm">
        <p>Powered by Celo MiniPay</p>
        <p className="mt-1">Secure, fast cross-border payments across Africa</p>
      </div>
    </div>
  )
}

