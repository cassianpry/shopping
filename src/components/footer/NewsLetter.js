import Link from "next/link"
import styles from "./styles.module.scss"

export default function NewsLetter() {
  return (
    <div className={styles.footer__newsletter}>
      <h3>NÃO PERCA NENHUMA NOVIDADE </h3>
      <div className={styles.flex}>
        <input type="text" placeholder="Digite seu e-mail" />
        <button className={styles.btn__primary}>Assine</button>
      </div>
      <p>
        <Link href="">Politica de Privacidade e Cookie</Link>
      </p>
    </div>
  )
}
