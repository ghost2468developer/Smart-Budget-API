import { Request, Response } from "express"
import prisma from "../utils/prisma"

interface AuthRequest extends Request {
  userId?: string
}

// Add a debt
export const addDebt = async (req: AuthRequest, res: Response) => {
  const { amount, interestRate, monthlyPayment } = req.body

  if (!amount || !interestRate || !monthlyPayment) {
    return res.status(400).json({ error: "All debt fields are required" })
  }

  try {
    const debt = await prisma.debt.create({
      data: {
        userId: req.userId!,
        amount,
        interestRate,
        monthlyPayment,
      },
    })
    res.status(201).json(debt)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

// Get all debts for the logged-in user
export const getDebts = async (req: AuthRequest, res: Response) => {
  try {
    const debts = await prisma.debt.findMany({
      where: { userId: req.userId },
      orderBy: { amount: "desc" },
    })
    res.json(debts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

export const deleteDebt = async (req: AuthRequest, res: Response) => {
  let { id } = req.params

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  // `id` is a string (Express can make it string | string[])
  if (Array.isArray(id)) id = id[0]

  try {
    const deleted = await prisma.debt.deleteMany({
      where: { id, userId: req.userId },
    })

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Debt not found" })
    }

    res.json({ message: "Debt deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}