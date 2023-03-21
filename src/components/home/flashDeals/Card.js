import Link from "next/link"
import { VscSymbolEvent } from "react-icons/vsc"
import styles from "./styles.module.scss"

export default function FlashDealsCard({ product }) {
  const price = parseFloat(product.price)
  const priceWithDiscount =
    product.price - (product.price / product.discount).toFixed(2)

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <img src={product.image} alt="" />
        </Link>

        <div className={styles.flash}>
          <VscSymbolEvent />
          <span>-{product.discount}%</span>
        </div>
      </div>

      <div className={styles.card__price}>
        <span>
          {price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <span>
          {priceWithDiscount.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      <div className={styles.card__bar}>
        <div
          className={styles.card__bar_inner}
          style={{ width: `${product.sold}%` }}
        ></div>
        <div className={styles.card__percentage}>
          {product.sold}% vendido(s)
        </div>
      </div>
    </div>
  )
}
