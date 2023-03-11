import { useState } from "react"
import styles from "./styles.module.scss"
import { MdSecurity } from "react-icons/md"
import { BsSuitHeart } from "react-icons/bs"
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri"
import Link from "next/link"
import UserMenu from "./UserMenu"
import { useSession } from "next-auth/react"

function Top({ country }) {
  const { data: session } = useSession()
  //const [loggedIn, SetLoggedIn] = useState(true)
  const [visible, setVisible] = useState(false)
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>

        <ul className={styles.top__list}>
          <li className={styles.li}>
            {country ? (
              <img src={country.flag} alt={country.name} />
            ) : (
              <img src="/images/brazil.png" alt="Bandeira do Brasil" />
            )}
            {country ? (
              <span> {country.name} / BRL</span>
            ) : (
              <span>Brasil / BRL</span>
            )}
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Site Seguro</span>
          </li>
          <li className={styles.li}>
            <span>Serviço ao Consumidor</span>
          </li>
          <li className={styles.li}>
            <span>Ajuda</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Lista de Desejos</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img src={session.user.image} alt="avatar" />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Sua Conta</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Top
