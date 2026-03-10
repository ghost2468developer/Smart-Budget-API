import prisma from "../utils/prisma"

// Add a new savings goal
export const addSavings = async (
  userId: string,
  title: string,
  targetAmount: number,
  currentAmount: number
) => {
  return prisma.savingsGoal.create({
    data: { userId, title, targetAmount, currentAmount }
  })
}

// Get all savings goals for a user
export const getSavingsGoals = async (userId: string) => {
  return prisma.savingsGoal.findMany({
    where: { userId },
    orderBy: { targetAmount: "desc" }
  })
}

// Update a savings goal's current amount
export const updateSavingsGoal = async (
  userId: string,
  goalId: string,
  currentAmount: number
) => {
  return prisma.savingsGoal.updateMany({
    where: { id: goalId, userId },
    data: { currentAmount }
  })
}

// Delete a savings goal
export const deleteSavingsGoal = async (userId: string, goalId: string) => {
  return prisma.savingsGoal.deleteMany({
    where: { id: goalId, userId }
  })
}