import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import expenseRoutes from "./routes/expenseRoutes"
import debtRoutes from "./routes/debtRoutes"
import savingsRoutes from "./routes/savingsRoutes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes)
app.use("/api/debts", debtRoutes)
app.use("/api/savings", savingsRoutes)

app.get("/", (_req, res) => {
  res.json({ message: "Smart Budget API running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})