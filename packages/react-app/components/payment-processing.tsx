"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, ArrowLeft, Loader2 } from "lucide-react"
import { formatAmount } from "@/lib/utils"

export type PaymentDetails = {
  amount: number
  recipientName: string
  recipientPhone: string
  currency: string
  date: Date
  txHash?: string
}

type PaymentProcessingProps = {
  paymentDetails: PaymentDetails
  onClose: () => void
  onSuccess: (transaction: PaymentDetails) => void
}

export default function PaymentProcessing({ 
  paymentDetails, 
  onClose, 
  onSuccess 
}: PaymentProcessingProps) {
  const [stage, setStage] = useState<"processing" | "confirming" | "success">("processing")
  
  useEffect(() => {
    // Simulate payment processing
    const processingTimer = setTimeout(() => {
      setStage("confirming")
      
      // Simulate blockchain confirmation
      const confirmationTimer = setTimeout(() => {
        // Add fake transaction hash
        const completedTransaction = {
          ...paymentDetails,
          txHash: `0x${Array.from({ length: 64 }).map(() => 
            Math.floor(Math.random() * 16).toString(16)).join('')}`
        }
        
        setStage("success")
        // Record transaction in history
        onSuccess(completedTransaction)
      }, 3000)
      
      return () => clearTimeout(confirmationTimer)
    }, 2000)
    
    return () => clearTimeout(processingTimer)
  }, [paymentDetails, onSuccess])
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {stage === "processing" && (
        <>
          <div className="w-16 h-16 rounded-full bg-indigo-100/10 flex items-center justify-center mb-6">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Sending {formatAmount(paymentDetails.amount)} {paymentDetails.currency} to {paymentDetails.recipientName}
          </p>
          <p className="text-white/40 text-xs text-center">
            Please wait while we process your payment...
          </p>
        </>
      )}
      
      {stage === "confirming" && (
        <>
          <div className="w-16 h-16 rounded-full bg-amber-100/10 flex items-center justify-center mb-6">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Confirming Transaction</h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Almost there! Your payment is being confirmed on the blockchain.
          </p>
          <div className="w-full max-w-xs bg-white/5 rounded-lg p-3 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Amount</span>
              <span className="font-medium">{formatAmount(paymentDetails.amount)} {paymentDetails.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Recipient</span>
              <span className="font-medium">{paymentDetails.recipientName}</span>
            </div>
          </div>
        </>
      )}
      
      {stage === "success" && (
        <>
          <div className="w-16 h-16 rounded-full bg-green-100/10 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-white/60 text-sm text-center mb-6">
            Your payment has been successfully processed and sent to {paymentDetails.recipientName}.
          </p>
          <div className="w-full max-w-xs bg-white/5 rounded-lg p-3 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Amount</span>
              <span className="font-medium">{formatAmount(paymentDetails.amount)} {paymentDetails.currency}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-white/60">Recipient</span>
              <span className="font-medium">{paymentDetails.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Date</span>
              <span className="font-medium">{paymentDetails.date.toLocaleDateString()}</span>
            </div>
          </div>
          <Button 
            className="bg-[#6E56CF] hover:bg-[#7C66D9] w-full max-w-xs"
            onClick={onClose} title={""}          >
            Done
          </Button>
        </>
      )}
      
      {stage !== "success" && (
        <Button 
          variant="ghost"
          className="mt-6 text-white/60 hover:text-white hover:bg-white/10"
          onClick={onClose} title={""}        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      )}
    </div>
  )
} 