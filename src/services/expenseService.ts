import prisma from "../utils/prisma"

export const createExpense = async (userId: string, category: string, amount: number) => {
  return prisma.expense.create({
    data: { userId, category, amount }
  })
}

export const getUserExpenses = async (userId: string) => {
  return prisma.expense.findMany({
    where: { userId },
    orderBy: { date: "desc" }
  })
}

export const deleteExpenseById = async (userId: string, id: string) => {
  return prisma.expense.deleteMany({
    where: { userId, id }
  })
}