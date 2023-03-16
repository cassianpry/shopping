import { VscArrowLeft } from "react-icons/vsc"
import styles from "./styles.module.scss"

export default function PrimaryButton({ type, text, icon }) {
  return (
    <button type={type} className={styles.button}>
      <div className={styles.svg__wrap}>{icon}</div>
      {text}
    </button>
  )
}
