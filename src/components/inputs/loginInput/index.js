import { ErrorMessage, Field, useField } from "formik"
import { VscAccount, VscLock, VscMail } from "react-icons/vsc"
import styles from "./styles.module.scss"

export default function LoginInput({ icon, type, placeholder, ...props }) {
  const [field, meta] = useField(props)

  return (
    <div
      className={`${styles.input} 
      ${meta.touched && meta.error ? styles.error : ""}`}
    >
      {icon == "user" ? (
        <VscAccount />
      ) : icon == "email" ? (
        <VscMail />
      ) : icon == "password" ? (
        <VscLock />
      ) : (
        ""
      )}
      <Field
        type={type}
        name={field.name}
        placeholder={placeholder}
        {...props}
        {...meta}
      />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  )
}
