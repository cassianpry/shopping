import { useState } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import axios from "axios"

import styles from "@/styles/forgot.module.scss"
import LoginInput from "@/components/inputs/loginInput"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import DotLoader from "@/components/loaders/dotLoader"

export default function Forgot() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState("")

  const emailValidation = Yup.object({
    email: Yup.string().required("").email("Preencha seu e-mail."),
  })
  const forgotHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      })
      setError("")
      setSuccess(data.message)
      setLoading(false)
      setEmail("")
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
              Esqueceu a senha? <Link href="/">Acessar sua conta</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler()
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <PrimaryButton type="submit" text="Enviar e-mail" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                  {success && <span className={styles.success}>{success}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
