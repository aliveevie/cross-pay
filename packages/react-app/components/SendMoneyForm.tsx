import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function SendMoneyForm() {
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-[#1E1B2C] rounded-2xl">
      <div className="space-y-4">
        <div>
          <label className="text-white mb-2 block">Select Destination Country</label>
          <Select
            placeholder="Select country..."
            className="w-full bg-[#2D2A3E] text-white border-none"
          >
            {/* Add country options here */}
          </Select>
        </div>

        <div className="flex justify-between items-center">
          <Button className="bg-[#4ADE80] hover:bg-[#3EBE6F] text-white px-8 py-2 rounded-lg">
            Send Money
          </Button>
          <button className="text-[#6F6D7B] hover:text-white">History</button>
        </div>

        <div>
          <label className="text-white mb-2 block">Amount</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.00"
              className="flex-1 bg-[#2D2A3E] text-white border-none"
            />
            <Select
              defaultValue="cUSD"
              className="w-24 bg-[#2D2A3E] text-white border-none"
            >
              <option value="cUSD">cUSD</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-white mb-2 block">Recipient Phone Number</label>
          <Input
            type="tel"
            placeholder="+234 800 000 0000"
            className="w-full bg-[#2D2A3E] text-white border-none"
          />
        </div>

        <Button className="w-full bg-[#4ADE80] hover:bg-[#3EBE6F] text-white py-3 rounded-lg flex items-center justify-center gap-2">
          Send Money
          <ArrowRight size={20} />
        </Button>
      </div>

      <div className="text-center space-y-1">
        <p className="text-[#6F6D7B] text-sm">Powered by Celo MiniPay</p>
        <p className="text-[#6F6D7B] text-xs">Secure, fast cross-border payments across Africa</p>
      </div>
    </div>
  );
} 