import { Router } from "express"
import { addDebt, getDebts, deleteDebt } from "../controllers/debtController"
import { authenticate } from "../middleware/authMiddleware"

const router = Router()

router.use(authenticate) // Protect all debt routes

router.post("/", addDebt)
router.get("/", getDebts)
router.delete("/:id", deleteDebt)

export default router