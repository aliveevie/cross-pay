"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { africaCountries, fetchWestAfricanCountries } from "@/lib/countries"
import type { CountryData } from "@/lib/types"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import Image from "next/image"

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
      <label className="text-sm text-white/80">Select Destination Country</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-[#2D2A3E] border-white/10 text-white hover:bg-[#2D2A3E]/80 hover:border-white/20"
            title="Select Country"
            onClick={() => {}}
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                {selectedCountry.flag && (
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
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
              "Select country..."
            )}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-[#2D2A3E] border-white/10 text-white">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {loading ? (
                  <div className="flex justify-center p-4">Loading...</div>
                ) : (
                  countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.name}
                      onSelect={() => handleSelect(country)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-white/5"
                    >
                      {country.flag && (
                        <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={country.flag}
                            alt={country.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <span>{country.name}</span>
                      {country.currencySymbol && (
                        <span className="text-white/60 text-xs">({country.currencySymbol})</span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCountry?.code === country.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

