import Link from "next/link"
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa"
import styles from "./styles.module.scss"

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>NÓS ACEITAMOS</h3>
      <div className={styles.footer__flexwrap}>
        <img src="/images/payment/paypal.webp" />
        <img src="/images/payment/visa.webp" />
        <img src="/images/payment/mastercard.webp" />
        <img src="/images/payment/maestro.webp" />
        <img src="/images/payment/american_express.webp" />
      </div>
    </div>
  )
}
