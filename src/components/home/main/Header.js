import Link from "next/link"
import styles from "./styles.module.scss"

export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="">Loja</Link>
        </li>
        <li>
          <Link href="">Eletrônicos</Link>
        </li>
        <li>
          <Link href="">Relógios</Link>
        </li>
      </ul>
    </div>
  )
}
