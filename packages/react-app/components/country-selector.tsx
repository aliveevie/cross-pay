"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { africaCountries, fetchWestAfricanCountries } from "@/lib/countries"
import type { CountryData } from "@/lib/types"
import { CheckIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

interface CountrySelectorProps {
  onSelectCountry: (country: CountryData) => void
}

export default function CountrySelector({ onSelectCountry }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [countries, setCountries] = useState<CountryData[]>(africaCountries)
  const [loading, setLoading] = useState(true)

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
        <PopoverContent className="w-full p-0 border-none bg-white rounded-lg overflow-hidden" sideOffset={4}>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute top-3 left-3 h-4 w-4 text-gray-500" />
            <CommandInput placeholder="Search country..." className="h-10 pl-9" />
          </div>
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto p-1">
              {loading ? (
                <div className="flex justify-center p-4">Loading...</div>
              ) : (
                countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={() => handleSelect(country)}
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100"
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
                    <CheckIcon
                      className={cn(
                        "h-4 w-4",
                        selectedCountry?.code === country.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Popover>
    </div>
  )
}

