import Offers from "./offers"
import MainSwiper from "./swiper"
import styles from "./styles.module.scss"
import MenuLeft from "./menu"

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <MenuLeft />
      <MainSwiper />
      <Offers />
      <div className={styles.user}>user</div>
    </div>
  )
}
