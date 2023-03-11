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
    name: "Privacy Center",
    link: "",
  },
  {
    name: "Privacy & Cookie Policy",
    link: "",
  },
  {
    name: "Manage Cookies",
    link: "",
  },
  {
    name: "Terms & Conditions",
    link: "",
  },
  {
    name: "Copyright Notice",
    link: "",
  },
]
