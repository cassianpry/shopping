import styles from "../../../styles/forgot.module.scss"
import { useState } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import axios from "axios"
import { getSession, signIn } from "next-auth/react"
import jwt from "jsonwebtoken"
import DotLoader from "@/components/loaders/dotLoader"
import LoginInput from "@/components/inputs/loginInput"
import PrimaryButton from "@/components/buttons/PrimaryButton"

export default function ResetPassword({ user_id }) {
  const [password, setPassword] = useState("")
  const [conf_password, setConf_password] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState("")

  console.log("user_id", user_id)

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("PDigite sua nova senha.")
      .min(6, "A senha deve conter pelo menos 6 caracteres.")
      .max(36, "A senha não pode ter mais que 36 caracteres"),
    conf_password: Yup.string()
      .required("Confirme sua senha.")
      .oneOf([Yup.ref("password")], "As senhas não são iguais."),
  })
  const resetHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      })
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      }
      await signIn("credentials", options)
      window.location.reload(true)
    } catch (error) {
      setLoading(false)
      setSuccess("")
      setError(error.response.data.message)
    }
  }
  return (
    <>
      {loading && <DotLoader />}
      <Link className={styles.logo} href="/">
        <img src="/logo.png" />
      </Link>
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <span>
              Resetar senha? <Link href="/">Acesse sua conta</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler()
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="conf_password"
                  icon="password"
                  placeholder="Confirme a senha"
                  onChange={(e) => setConf_password(e.target.value)}
                />

                <PrimaryButton type="submit" text="Resetar Senha" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query, req } = context
  const token = query.token
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET)
  if (user_id == null) {
    console.log(token)
  }
  console.log(user_id)
  return {
    props: {
      user_id: user_id.id,
    },
  }
}
