import prisma from "../utils/prisma"

// Rename to avoid conflict
export const createDebt = async (userId: string, amount: number, interestRate: number, monthlyPayment: number) => {
  return prisma.debt.create({ data: { userId, amount, interestRate, monthlyPayment } })
}

// Rename to fetch debts
export const fetchDebts = async (userId: string) => {
  return prisma.debt.findMany({ where: { userId }, orderBy: { amount: "desc" } })
}

// Rename to delete debt
export const removeDebt = async (userId: string, debtId: string) => {
  return prisma.debt.deleteMany({ where: { id: debtId, userId } })
}