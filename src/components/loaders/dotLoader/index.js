import { Oval } from "react-loader-spinner"
import styles from "./styles.module.scss"

export default function DotLoader({ loading }) {
  return (
    <div className={styles.loader}>
      <Oval
        height={80}
        width={80}
        color="#00b7ff"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2f82ff"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}
