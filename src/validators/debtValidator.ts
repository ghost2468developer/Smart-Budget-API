import { z } from "zod"

export const createDebtSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  interestRate: z.number().nonnegative("Interest rate cannot be negative"),
  monthlyPayment: z.number().positive("Monthly payment must be greater than 0")
})