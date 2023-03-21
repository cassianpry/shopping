import Link from "next/link"
import { VscArrowCircleRight } from "react-icons/vsc"
import styles from "./styles.module.scss"

export default function Category({ header, products, link, background }) {
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>
          <Link href={link}>{header}</Link>
        </h1>
        <VscArrowCircleRight />
      </div>
      <div className={styles.category__products}>
        {products?.map((product) => (
          <div className={styles.product}>
            <img src={product.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}
