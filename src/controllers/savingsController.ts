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

// Update a savings goal
export const updateSavingsGoal = async (req: AuthRequest, res: Response) => {
  let { id } = req.params
  const { currentAmount } = req.body

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  // `id` is a string
  if (Array.isArray(id)) id = id[0]

  try {
    const updated = await prisma.savingsGoal.updateMany({
      where: { id, userId: req.userId },
      data: { currentAmount },
    })

    if (updated.count === 0) {
      return res.status(404).json({ error: "Savings goal not found" })
    }

    res.json({ message: "Savings goal updated", updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

// Delete a savings goal
export const deleteSavingsGoal = async (req: AuthRequest, res: Response) => {
  let { id } = req.params

  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  // `id` is a string (Express can make it string | string[])
  if (Array.isArray(id)) id = id[0]

  try {
    const deleted = await prisma.savingsGoal.deleteMany({
      where: { id, userId: req.userId },
    })

    if (deleted.count === 0) {
      return res.status(404).json({ error: "Savings goal not found" })
    }

    res.json({ message: "Savings goal deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}