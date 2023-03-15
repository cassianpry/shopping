import Link from "next/link"
import { signOut, signIn } from "next-auth/react"
import styles from "./styles.module.scss"
import { useRouter } from "next/router"

export default function UserMenu({ session }) {
  const router = useRouter()
  return (
    <div className={styles.menu}>
      <h4>Bem-vindo(a) ao Shop!</h4>
      {session ? (
        <div className={styles.flex}>
          <img className={styles.menu__img} src={session.user.image} alt="" />
          <div className={styles.col}>
            <span>Olá, </span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Sair</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button
            className={styles.btn__primary}
            onClick={() => router.push("/signup")}
          >
            Registrar-se
          </button>
          <button className={styles.btn__outlined} onClick={() => signIn()}>
            Entrar
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Perfil</Link>
        </li>
        <li>
          <Link href="/profile/orders">Minhas Compras</Link>
        </li>
        <li>
          <Link href="/profile/messages">Mensagens</Link>
        </li>
        <li>
          <Link href="/profile/address">Endereço</Link>
        </li>
        <li>
          <Link href="/profile/whishlist">Lista de Desejos</Link>
        </li>
      </ul>
    </div>
  )
}
