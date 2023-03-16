import { createRouter } from "next-connect"
import db from "@/utils/db"
import User from "@/models/User"
import { createResetToken } from "@/utils/tokens"
import { resetEmailTemplate } from "@/templates/forgot"
import { sendEmail } from "@/utils/sendEmails"

const router = createRouter()

router.post(async (req, res) => {
  try {
    await db.connectDb()
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        message: "Enviamos um e-mail com as instruções para mudar a sua senha.",
      })
    }
    const user_id = createResetToken({
      id: user._id.toString(),
    })
    const url = `${process.env.BASE_URL}/auth/reset/${user_id}`
    sendEmail(email, url, "", "", "Mudança de senha.", resetEmailTemplate)
    await db.disconnectDb()
    res.json({
      message: "Enviamos um e-mail com as instruções para mudar a sua senha. ",
    })
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
