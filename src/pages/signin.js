import { useState } from "react"
import LoginInput from "@/components/inputs/loginInput"
import { Form, Formik } from "formik"

import * as Yup from "yup"
import Footer from "@/components/footer"
import Header from "@/components/header"

import styles from "../styles/signin.module.scss"
import PrimaryButton from "@/components/footer/buttons/PrimaryButton"
import { BsPerson } from "react-icons/bs"
import Link from "next/link"
import { getProviders, signIn } from "next-auth/react"

const initial_values = {
  login_email: "",
  login_password: "",
}

const loginValidation = Yup.object().shape({
  login_email: Yup.string()
    .required("Endereço de e-mail é obrigatório!")
    .email("E-mail inválido!"),
})

export default function signin({ providers }) {
  const [user, setUser] = useState(initial_values)
  const { login_email, login_password } = user

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  console.log(user)
  console.log(providers)
  return (
    <>
      <Header country="Teste" />
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
            >
              {({ form }) => (
                <Form>
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
                {providers.map((provider) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer country="Teste" />
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders())
  return {
    props: { providers },
  }
}
