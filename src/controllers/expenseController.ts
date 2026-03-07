import { Request, Response } from "express"
import prisma from "../utils/prisma"

interface AuthRequest extends Request {
  userId?: string
}

export const addExpense = async (req: AuthRequest, res: Response) => {
  const { category, amount } = req.body
  const userId = req.userId

  if (!category || !amount) {
    return res.status(400).json({ error: "Category and amount required" })
  }

  try {
    const expense = await prisma.expense.create({
      data: { category, amount, userId: userId! },
    })
    res.status(201).json(expense)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.userId },
      orderBy: { date: "desc" },
    })
    res.json(expenses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  let { id } = req.params

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  // `id` is a string (Express can make it string | string[])
  if (Array.isArray(id)) id = id[0]

  try {
    const deleted = await prisma.expense.deleteMany({
      where: { id, userId: req.userId },
    })

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Expense not found" })
    }

    res.json({ message: "Expense deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}