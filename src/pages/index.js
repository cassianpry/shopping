import { useSession, signIn, signOut } from "next-auth/react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import axios from "axios"
import Main from "@/components/home/main"
import FlashDeals from "@/components/home/flashDeals"

import styles from "@/styles/home.module.scss"
import Category from "@/components/home/category"
import { women_dresses, women_accessories, women_shoes } from "@/data/home"

export default function Home({ country }) {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home_category}>
            <Category
              header="Vestidos"
              products={women_dresses}
              background="#393D47"
              link=""
            />
            <Category
              header="Acessórios"
              products={women_accessories}
              background="#393D47"
              l
              link=""
            />
            <Category
              header="Sapatos"
              products={women_shoes}
              background="#393D47"
              link=""
            />
          </div>
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
