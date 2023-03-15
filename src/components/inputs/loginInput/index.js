import { ErrorMessage, Field, useField } from "formik"
import { BsGenderTrans } from "react-icons/bs"
import { IoCallOutline } from "react-icons/io5"
import {
  VscAccount,
  VscCalendar,
  VscLock,
  VscMail,
  VscPreview,
} from "react-icons/vsc"
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
      ) : icon == "gender" ? (
        <BsGenderTrans />
      ) : icon == "birthday" ? (
        <VscCalendar />
      ) : icon == "document" ? (
        <VscPreview />
      ) : icon == "phone" ? (
        <IoCallOutline />
      ) : (
        ""
      )}
      <Field
        type={type}
        name={field.name}
        placeholder={placeholder}
        {...props}
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
