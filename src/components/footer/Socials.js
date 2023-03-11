import Link from "next/link"
import {
  BsInstagram,
  BsPinterest,
  BsSnapchat,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs"
import { FaFacebook, FaTiktok } from "react-icons/fa"
import styles from "./styles.module.scss"

export default function Socials() {
  return (
    <div className={styles.footer__socials}>
      <section>
        <h1>SHOP nas redes</h1>
        <ul>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <BsInstagram />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <BsTwitter />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <BsYoutube />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <BsPinterest />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <BsSnapchat />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
