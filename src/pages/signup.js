import { useRouter } from "next/router"
import { useState } from "react"
import LoginInput from "@/components/inputs/loginInput"
import { Form, Formik } from "formik"
import axios from "axios"

import * as Yup from "yup"
// import Footer from "@/components/footer"
// import Header from "@/components/header"

import styles from "../styles/signup.module.scss"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import Link from "next/link"
import { getProviders, signIn } from "next-auth/react"
import DotLoader from "@/components/loaders/dotLoader"

const initial_values = {
  name: "",
  gender: "",
  birthDay: "",
  document: "",
  phone: "",
  email: "",
  password: "",
  confirm_password: "",
  message: "",
  success: "",
  error: "",
}

const loginValidation = Yup.object().shape({
  name: Yup.string()
    .required("Informe seu nome completo.")
    .min(6, "Nome deve ser completo."),
  //   phone: Yup.string()
  //     .required("Informe o número do telefone.")
  //     .min(6, "Número de telefone inválido."),
  email: Yup.string()
    .required("Endereço de e-mail é obrigatório.")
    .email("E-mail inválido!"),
  password: Yup.string()
    .required("Precisa ter entre 6 a 20 caracteres.")
    .min(6, "Mínimo de 6 caracteres.")
    .max(20, "Máximo de 20 caracteres."),
  confirm_password: Yup.string()
    .required("Confirme sua senha.")
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais."),
})

export default function signup({ providers }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(initial_values)
  const {
    name,
    gender,
    birthDay,
    document,
    phone,
    email,
    password,
    confirm_password,
    message,
    success,
    error,
  } = user

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post("/api/auth/signup", {
        name,
        gender,
        birthDay,
        document,
        phone,
        email,
        password,
      })
      setUser({ ...user, error: "", success: data.message })
      setLoading(false)
      setTimeout(() => {
        router.push("/"), 2000
      })
    } catch (error) {
      setLoading(false)
      setUser({ ...user, success: "", error: error.response.data.message })
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
            <h1>Criar seu cadastro</h1>
          </div>
          <div className={styles.login__header}>
            <span>
              Você pode acompanhar seus pedidos de forma fácil e rápida.
            </span>
          </div>
          <div className={styles.login__form}>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                gender,
                birthDay,
                document,
                phone,
                email,
                password,
                confirm_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => handleSubmit()}
            >
              {({ form }) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Nome completo"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="text"
                    name="gender"
                    icon="gender"
                    placeholder="Genero"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="text"
                    name="birthDay"
                    icon="birthday"
                    placeholder="Data de nascimento"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="document"
                    icon="document"
                    placeholder="CPF"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="phone"
                    icon="phone"
                    placeholder="Telefone"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Endereço de e-mail"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Senha"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="confirm_password"
                    icon="password"
                    placeholder="Confirme a senha"
                    onChange={handleChange}
                  />

                  <PrimaryButton type="submit" text="Criar cadastro" />
                </Form>
              )}
            </Formik>
            <div className={styles.success}>
              {success && <span>{success}</span>}
            </div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
            <div className={styles.login__header}>
              <span>
                O site é seguro! Ao realizar o cadastro, você concorda com a
                nossa&nbsp;
                <Link className={styles.link} href="#">
                  Politica de Privacidade.
                </Link>
              </span>
            </div>
            <div className={styles.login__header}>
              <span>
                Já possui cadastro?&nbsp;
                <a className={styles.link} onClick={() => signIn()}>
                  Acesse sua conta.
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders())
  return {
    props: { providers },
  }
}
