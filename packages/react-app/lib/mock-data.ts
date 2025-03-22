import { PaymentDetails } from "@/components/payment-processing";

export const mockTransactions: PaymentDetails[] = [
  {
    amount: 250.00,
    recipientName: "John Doe",
    recipientPhone: "+234 812 345 6789",
    currency: "cUSD",
    date: new Date(2023, 10, 15),
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d"
  },
  {
    amount: 100.00,
    recipientName: "Alice Smith",
    recipientPhone: "+233 541 234 5678",
    currency: "cUSD",
    date: new Date(2023, 10, 10),
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
  }
];

