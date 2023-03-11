import Link from "next/link"
import styles from "./styles.module.scss"

export default function Links() {
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul key={i}>
          {i === 0 ? <img src="/logo.png" alt="logo" /> : <b>{link.heading}</b>}
          {link.links.map((link, i) => (
            <li key={i}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
const links = [
  {
    heading: "SHOP",
    links: [
      {
        name: "Sobre nós",
        link: "",
      },
      {
        name: "Entre em contato",
        link: "",
      },
      {
        name: "Responsabilidade Social",
        link: "",
      },
      {
        name: "",
        link: "",
      },
    ],
  },
  {
    heading: "AJUDA & SUPORTE",
    links: [
      {
        name: "Informações de envio",
        link: "",
      },
      {
        name: "Retorno",
        link: "",
      },
      {
        name: "Como comprar",
        link: "",
      },
      {
        name: "Como acompanhar",
        link: "",
      },
      {
        name: "Guias",
        link: "",
      },
    ],
  },
  {
    heading: "SERVIÇO AO CONSUMIDOR",
    links: [
      {
        name: "Atendimento ao cliente",
        link: "",
      },
      {
        name: "Termos e condições",
        link: "",
      },
      {
        name: "Cliente (Transações)",
        link: "",
      },
      {
        name: "Conte-nos sobre suas compras",
        link: "",
      },
    ],
  },
]
