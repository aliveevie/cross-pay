"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowRight, Info } from "lucide-react";
import { africaCountries } from "@/lib/countries";
import type { CountryData } from "@/lib/types";

interface SendMoneyFormProps {
  selectedCountry: CountryData | null;
  onHistoryClick: () => void;
}

export default function SendMoneyForm({ selectedCountry, onHistoryClick }: SendMoneyFormProps) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Prefill phone with country code if available and phone is empty
    if (selectedCountry && !phone) {
      // This is just a placeholder - we'd need a proper mapping of countries to phone codes
      const countryCodes: Record<string, string> = {
        "NG": "+234 ",
        "GH": "+233 ",
        "CI": "+225 ",
        "SN": "+221 "
      };
      
      if (countryCodes[selectedCountry.code]) {
        setPhone(countryCodes[selectedCountry.code]);
      }
    }
  }, [selectedCountry, phone]);

  const handleSendMoney = () => {
    // Implement send money functionality
    console.log("Sending money:", {
      country: selectedCountry,
      amount,
      phone
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          className="bg-[#4ADE80] hover:bg-[#3EBE6F] text-white px-8 py-2 rounded-full"
          title="Send Money"
          onClick={handleSendMoney}
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

      {selectedCountry && (
        <div className="bg-[#2D2A3E]/70 p-3 rounded-lg flex items-start gap-2">
          {selectedCountry.flag && (
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-white font-medium">{selectedCountry.name}</p>
            <p className="text-white/70 text-sm">
              Currency: {selectedCountry.currency} 
              {selectedCountry.currencySymbol && ` (${selectedCountry.currencySymbol})`}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-white text-base">Amount</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 h-12 bg-[#2D2A3E] text-white border-white/10 rounded-full px-4"
          />
          <Select defaultValue="cUSD">
            <SelectTrigger className="w-24 h-12 bg-[#2D2A3E] text-white border-white/10 rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2A3E] border-white/10 text-white">
              <SelectItem value="cUSD">cUSD</SelectItem>
              {selectedCountry?.currency && selectedCountry.currency !== "USD" && (
                <SelectItem value={selectedCountry.currency}>
                  {selectedCountry.currency}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-white text-base">Recipient Phone Number</label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 000 0000"
          className="w-full h-12 bg-[#2D2A3E] text-white border-white/10 rounded-full px-4"
        />
      </div>

      <Button 
        className="w-full bg-[#4ADE80] hover:bg-[#3EBE6F] text-white py-3 rounded-full flex items-center justify-center gap-2 h-12"
        title="Send Money"
        onClick={handleSendMoney}
        disabled={!selectedCountry || !amount || !phone}
      >
        Send Money
        <ArrowRight size={20} />
      </Button>
    </div>
  );
} 