import Link from "next/link"
import { RiSearch2Line } from "react-icons/ri"
import { FaOpencart } from "react-icons/fa"
import styles from "./styles.module.scss"
import { useSelector } from "react-redux"

export default function Main() {
  const cart = useSelector((state) => ({ ...state }))

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link className={styles.logo} href="/">
          <img src="/logo.png" />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Pesquisar..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link className={styles.cart} href="/cart">
          <FaOpencart />
          {cart.length && <span>{cart.length}</span>}
        </Link>
      </div>
    </div>
  )
}
