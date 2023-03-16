import { createRouter } from "next-connect"
import bcrypt from "bcrypt"
import db from "@/utils/db"
import User from "@/models/User"

const router = createRouter()

router.put(async (req, res) => {
  try {
    await db.connectDb()
    const { user_id, password } = req.body
    const user = await User.findById(user_id)
    if (!user) {
      return res.status(400).json({ message: "." })
    }
    const cryptedPassword = await bcrypt.hash(password, 12)
    await user.updateOne({
      password: cryptedPassword,
    })
    res.status(200).json({ email: user.email })
    await db.disconnectDb()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(500).end("Something broke!")
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found")
  },
})
