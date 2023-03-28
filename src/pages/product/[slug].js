import styles from '@/styles/product.module.scss'
import db from '@/utils/db'
import Product from '@/models/Product'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Category from '@/models/Category'
import SubCategory from '@/models/SubCategory'
import MainSwiper from '@/components/productPage/MainSwiper'
import { useState } from 'react'
import Infos from '@/components/productPage/Infos'

export default function Products({ product }) {
  const [activeImage, setActiveImg] = useState('')
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            pagina inicial / {product.category.name} /
            {product.subCategories.map((sub) => (
              <span>{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImage={activeImage} />
            <Infos product={product} setActiveImg={setActiveImg} />
          </div>
        </div>
      </div>
      {/* <Footer country='' /> */}
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const slug = query.slug
  const style = query.style
  const size = query.size || 0

  db.connectDb()
  let product = await Product.findOne({ slug })
    .populate({ path: 'category', model: Category })
    .populate({ path: 'subCategories._id', model: SubCategory })
    .lean()
  let subProduct = product.subProducts[style]
  let prices =
    subProduct.sizes
      .map((s) => {
        return s.price
      })
      .sort((a, b) => {
        return a - b
      }) || 0
  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color
    }),
    priceRange:
      prices.length > 1
        ? `De ${prices[0]} por ${prices[prices.length - 1]}`
        : '',
    //prettier-ignore
    price:
      subProduct.discount > 0
        ? (subProduct.sizes[size].price -
          (subProduct.sizes[size].price / subProduct.discount)
          ).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })
        : subProduct.sizes[size].price.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }),
    priceBefore: subProduct.sizes[size].price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }),
    quantity: subProduct.sizes[size].qty,
  }
  db.disconnectDb()

  return {
    props: { product: JSON.parse(JSON.stringify(newProduct)) },
  }
}
