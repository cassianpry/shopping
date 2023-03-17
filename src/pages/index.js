import { useSession, signIn, signOut } from "next-auth/react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import axios from "axios"
import styles from "@/styles/home.module.scss"
import Main from "@/components/home/main"

export default function Home({ country }) {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </>
  )
}

// export async function getServerSideProps() {
//   let data = await axios
//     .get("https://api.ipregistry.co/?key=ohxqiqivtro3v6o3")
//     .then((res) => {
//       return res.data.location.country
//     })
//     .catch((err) => console.log(err))
//   return {
//     props: {
//       country: { name: data.name, flag: data.flag.emojitwo },
//     },
//   }
// }
