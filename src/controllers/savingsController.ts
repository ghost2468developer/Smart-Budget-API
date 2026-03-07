import { Request, Response } from "express"
import prisma from "../utils/prisma"

interface AuthRequest extends Request {
  userId?: string
}

// Add a savings goal
export const addSavingsGoal = async (req: AuthRequest, res: Response) => {
  const { title, targetAmount, currentAmount } = req.body

  if (!title || !targetAmount) {
    return res.status(400).json({ error: "Title and target amount required" })
  }

  try {
    const goal = await prisma.savingsGoal.create({
      data: {
        userId: req.userId!,
        title,
        targetAmount,
        currentAmount: currentAmount || 0,
      },
    })
    res.status(201).json(goal)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

// Get all savings goals
export const getSavingsGoals = async (req: AuthRequest, res: Response) => {
  try {
    const goals = await prisma.savingsGoal.findMany({
      where: { userId: req.userId },
      orderBy: { targetAmount: "desc" },
    })
    res.json(goals)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

// Update a savings goal (e.g., currentAmount)
export const updateSavingsGoal = async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  const { currentAmount } = req.body

  try {
    const updated = await prisma.savingsGoal.updateMany({
      where: { id, userId: req.userId },
      data: { currentAmount },
    })
    res.json({ message: "Savings goal updated", updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

// Delete a savings goal
export const deleteSavingsGoal = async (req: AuthRequest, res: Response) => {
  const { id } = req.params

  try {
    await prisma.savingsGoal.deleteMany({ where: { id, userId: req.userId } })
    res.json({ message: "Savings goal deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}