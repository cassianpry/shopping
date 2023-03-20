import MenuLeft from "./MenuLeft"
import MainSwiper from "./MainSwiper"
import Offers from "./Offers"
import UserMenu from "./UserMenu"
import styles from "./styles.module.scss"
import Header from "./Header"

export default function Main() {
  return (
    <div className={styles.main}>
      <Header />
      <MenuLeft />
      <MainSwiper />
      <Offers />
      <UserMenu />
    </div>
  )
}
