import { createRouter } from "next-connect"
import db from "@/utils/db"
import bcrypt from "bcrypt"
import { validateEmail } from "@/utils/validation"
import User from "@/models/User"
import { createActivationToken } from "@/utils/tokens"
import { activateEmailTemplate } from "@/templates/email"
import { sendEmail } from "@/utils/sendEmails"

const router = createRouter()

router.post(async (req, res) => {
  try {
    await db.connectDb()
    const { name, gender, birthDay, document, phone, email, password } =
      req.body
    console.log(req.body)
    if (
      !name ||
      !gender ||
      !birthDay ||
      !document ||
      !phone ||
      !email ||
      !password
    ) {
      res.status(400).json({ message: "Por favor preencha todos os campos." })
      return
    }

    if (!validateEmail(email)) {
      res.status(400).json({ message: "E-mail invalido" })
      return
    }

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: "E-mail já cadastrado.." })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha precisa ter pelo menos 6 caracteres." })
    }

    const cryptedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
      gender,
      birthDay,
      document,
      phone,
    })

    const addedUser = await newUser.save()
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    })
    const url = `${process.env.BASE_URL}/activate/${activation_token}`
    sendEmail(
      email,
      url,
      name,
      "",
      "Valide a sua conta.",
      activateEmailTemplate
    )
    await db.disconnectDb()
    res.json({
      message: "Cadastro concluído! Por favor valide sua conta.",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
    return
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
