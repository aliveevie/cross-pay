"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { africaCountries, fetchWestAfricanCountries } from "@/lib/countries"
import type { CountryData } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface CountrySelectorProps {
  onSelectCountry: (country: CountryData) => void
}

export default function CountrySelector({ onSelectCountry }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [countries, setCountries] = useState<CountryData[]>(africaCountries)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadCountries() {
      try {
        setLoading(true)
        const westAfricanCountries = await fetchWestAfricanCountries()
        setCountries(westAfricanCountries)
      } catch (error) {
        console.error("Failed to load countries:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  const handleSelect = (country: CountryData) => {
    setSelectedCountry(country)
    onSelectCountry(country)
    setOpen(false)
  }

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-2">
      <label className="text-base text-white">Select Destination Country</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button 
            className="relative w-full rounded-full py-3 px-4 text-left bg-[#2D2A3E] text-white border-none outline-none focus:ring-1 focus:ring-white/20"
            type="button"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                {selectedCountry.flag && (
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={selectedCountry.flag}
                      alt={selectedCountry.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span>{selectedCountry.name}</span>
              </div>
            ) : loading ? (
              "Loading countries..."
            ) : (
              "Select Country"
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2 border-none bg-white rounded-lg" sideOffset={4}>
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search country..."
              className="pl-8 bg-gray-100 border-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-64 overflow-auto">
            {loading ? (
              <div className="flex justify-center p-4 text-gray-500">Loading...</div>
            ) : filteredCountries.length === 0 ? (
              <div className="p-2 text-gray-500 text-center">No countries found</div>
            ) : (
              <div className="space-y-1">
                {filteredCountries.map(country => (
                  <button
                    key={country.code}
                    className={cn(
                      "flex items-center gap-2 w-full p-2 text-left rounded-md",
                      "hover:bg-gray-100 transition-colors cursor-pointer",
                      selectedCountry?.code === country.code && "bg-gray-100"
                    )}
                    onClick={() => handleSelect(country)}
                  >
                    {country.flag && (
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="flex-1">{country.name}</span>
                    {country.currencySymbol && (
                      <span className="text-gray-500 text-xs">({country.currencySymbol})</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

