import { Router } from "express"
import { addExpense, getExpenses, deleteExpense } from "../controllers/expenseController"
import { authenticate } from "../middleware/authMiddleware"

const router = Router()

router.use(authenticate) // Protect all expense routes

router.post("/", addExpense)
router.get("/", getExpenses)
router.delete("/:id", deleteExpense)

export default router