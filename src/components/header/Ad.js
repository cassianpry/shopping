import Link from "next/link"
import styles from "./styles.module.scss"

function Ad() {
  return (
    <Link href="#">
      <div className={styles.ad}>Insert your ad here...</div>
    </Link>
  )
}

export default Ad
