"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { africaCountries } from "@/lib/countries"
import type { CountryData } from "@/lib/types"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"

interface CountrySelectorProps {
  onSelectCountry: (country: CountryData) => void
}

export default function CountrySelector({ onSelectCountry }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)

  const handleSelect = (country: CountryData) => {
    setSelectedCountry(country)
    onSelectCountry(country)
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">Select Destination Country</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={`/placeholder.svg?height=20&width=20&text=${selectedCountry.code}`}
                    alt={selectedCountry.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{selectedCountry.name}</span>
              </div>
            ) : (
              "Select country..."
            )}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-[#2D0B5A] border-white/10 text-white">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {africaCountries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={() => handleSelect(country)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5"
                  >
                    <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={`/placeholder.svg?height=20&width=20&text=${country.code}`}
                        alt={country.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{country.name}</span>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCountry?.code === country.code ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

