import { useSession } from "next-auth/react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import axios from "axios"
import Main from "@/components/home/main"
import FlashDeals from "@/components/home/flashDeals"

import styles from "@/styles/home.module.scss"
import Category from "@/components/home/category"
import {
  women_dresses,
  women_accessories,
  women_shoes,
  women_swiper,
  gamingSwiper,
  homeImprovSwiper,
} from "@/data/home"
import ProductsSwiper from "@/components/productSwiper"
import Product from "@/models/Product"
import db from "@/utils/db"
import ProductCard from "@/components/productCard"

export default function Home({ country, products }) {
  const { data: session } = useSession()

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
          <ProductsSwiper
            header="Para Mulheres"
            products={women_swiper}
            background="	#9F2B68"
          />
          <ProductsSwiper
            header="Tudo para jogos"
            products={gamingSwiper}
            background="#228B22"
          />

          <ProductsSwiper
            header="Para sua Casa"
            products={homeImprovSwiper}
            background="#CD7F32"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  )
}

export async function getServerSideProps() {
  db.connectDb()
  let products = await Product.find().sort({ createdAt: -1 }).lean()
  db.disconnectDb()
  //let data = await axios
  //   .get(`https://api.ipregistry.co/?key=${process.env.IPREGISTRY_KEY}`)
  //   .then((res) => {
  //     return res.data.location.country
  //   })
  //.catch((err) => console.log(err))
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      //country: { name: data.name, flag: data.flag.emojitwo },
    },
  }
}
