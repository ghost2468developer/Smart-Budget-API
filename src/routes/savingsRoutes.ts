import { Router } from "express"
import {
  addSavingsGoal,
  getSavingsGoals,
  updateSavingsGoal,
  deleteSavingsGoal,
} from "../controllers/savingsController"
import { authenticate } from "../middleware/authMiddleware"

const router = Router()

router.use(authenticate) // Protect all savings routes

router.post("/", addSavingsGoal)
router.get("/", getSavingsGoals)
router.patch("/:id", updateSavingsGoal)
router.delete("/:id", deleteSavingsGoal)

export default router