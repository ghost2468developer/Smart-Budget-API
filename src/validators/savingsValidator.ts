import { z } from "zod"

export const createSavingsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  targetAmount: z.number().positive("Target amount must be greater than 0"),
  currentAmount: z.number().nonnegative("Current amount cannot be negative").optional()
})