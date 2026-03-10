import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../utils/prisma"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined")
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" })
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return res.status(400).json({ error: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ error: "All fields are required" })

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ error: "Invalid credentials" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: "Invalid credentials" })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })

    res.json({ user: { id: user.id, name: user.name, email: user.email }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}