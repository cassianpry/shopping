import Link from "next/link"
import { IoLocationSharp } from "react-icons/io5"
import styles from "./styles.module.scss"

export default function Copyright({ country }) {
  return (
    <div className={styles.footer__copyright}>
      <section>
        <h3>© 2022 SHOP - Este site foi feito para fins de aprendizado.</h3>
      </section>
      <section>
        <ul>
          {data.map((link) => (
            <li key={link.name}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp />
              {country ? <span>{country.name}</span> : <span>Brasil</span>}
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
const data = [
  {
    name: "Institucional",
    link: "/",
  },
  {
    name: "Politica de Privacidade",
    link: "/",
  },
  {
    name: "Politica de entrega",
    link: "/",
  },

  {
    name: "Termos e condições",
    link: "/",
  },
  {
    name: "Cookies",
    link: "/",
  },
]
