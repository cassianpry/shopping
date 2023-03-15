import { useState } from "react"
import LoginInput from "@/components/inputs/loginInput"
import { Form, Formik } from "formik"

import * as Yup from "yup"
// import Footer from "@/components/footer"
// import Header from "@/components/header"

import styles from "../styles/signin.module.scss"
import PrimaryButton from "@/components/footer/buttons/PrimaryButton"
import { BsPerson } from "react-icons/bs"
import Link from "next/link"
import { getCsrfToken, getProviders, getSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import DotLoader from "@/components/loaders/dotLoader"

const initial_values = {
  login_email: "",
  login_password: "",
  success: "",
  error: "",
  login_error: "",
}

const loginValidation = Yup.object().shape({
  login_email: Yup.string()
    .required("Endereço de e-mail é obrigatório!")
    .email("E-mail inválido!"),
})

export default function signin({ providers, callbackUrl, csrfToken }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(initial_values)
  const { login_email, login_password, success, login_error } = user

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    }
    const res = await signIn("credentials", options)
    setUser({ ...user, success: "", error: "" })

    if (res?.error) {
      setLoading(false)
      setUser({ ...user, login_error: res?.error })
    } else {
      setLoading(false)
      setTimeout(() => {
        router.push(callbackUrl || "/"), 2000
      })
    }
  }

  console.log(user)
  console.log(providers)
  return (
    <>
      {loading && <DotLoader />}
      <Link className={styles.logo} href="/">
        <img src="/logo.png" />
      </Link>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BsPerson />
            </div>
            <h1>Fazer login</h1>
          </div>
          <div className={styles.login__header}>
            <span>Para ter uma experiencia completa, acesse sua conta :)</span>
          </div>
          <div className={styles.login__form}>
            <Formik
              enableReinitialize
              initialValues={{ login_email, login_password }}
              validationSchema={loginValidation}
              onSubmit={() => handleSubmit()}
            >
              {({ form }) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />

                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Endereço de e-mail"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Senha"
                    onChange={handleChange}
                  />

                  <PrimaryButton type="submit" text="Continuar" />

                  <div className={styles.success}>
                    {success && <span>{success}</span>}
                  </div>
                  <div className={styles.error}>
                    {login_error && <span>{login_error}</span>}
                  </div>

                  <div className={styles.forgot}>
                    <span>Esqueceu a senha?</span>
                    <Link href="/forget">&nbsp;Recuperar senha</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__social}>
              <span className={styles.or}>Conecte usando sua rede social</span>
              <div className={styles.login__social_wrap}>
                {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return
                  }
                  return (
                    <div key={provider.id}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img
                          src={`icons/${provider.name.toLowerCase()}.png`}
                          alt={provider.name}
                        />
                        <span>{provider.name}</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.login__bottom}>
              <span>
                Ao continuar o acesso, você concorda com a nossa&nbsp;
                <Link className={styles.link} href="#">
                  Politica de Privacidade.
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, query } = context

  const session = await getSession({ req })
  const { callbackUrl } = query

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    }
  }
  const csrfToken = await getCsrfToken(context)
  const providers = Object.values(await getProviders())
  return {
    props: { providers, csrfToken, callbackUrl },
  }
}
