import { Request, Response } from "express"
import { AuthRequest } from "../types/auth"
import { createExpense, getUserExpenses, deleteExpenseById } from "../services/expenseService"
import { createExpenseSchema } from "../validators/expenseValidator"

export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    const validated = createExpenseSchema.parse(req.body)
    const expense = await createExpense(req.userId!, validated.category, validated.amount)
    res.status(201).json(expense)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const expenses = await getUserExpenses(req.userId!)
  res.json(expenses)
}

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  let { id } = req.params
  if (!id) return res.status(400).json({ error: "Expense ID required" })
  if (Array.isArray(id)) id = id[0]

  const deleted = await deleteExpenseById(req.userId!, id)
  if (deleted.count === 0) return res.status(404).json({ error: "Expense not found" })

  res.json({ message: "Expense deleted" })
}