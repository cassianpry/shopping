import Link from "next/link"
import { useState, useEffect } from "react"
import ProductCardSwiper from "./ProductCardSwiper"
import styles from "./styles.module.scss"

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0)
  const [images, setImages] = useState(product.subProducts[active]?.images)
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return s.price
      })
      .sort((a, b) => {
        return a - b
      })
  )

  const [styless, setStyless] = useState(
    product.subProducts.map((p) => {
      return p.color
    })
  )

  useEffect(() => {
    setImages(product.subProducts[active]?.images)
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => {
          return s.price
        })
        .sort((a, b) => {
          return a - b
        })
    )
  }, [active])

  console.log(prices[0] - prices[prices.length - 1])
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div className="">
            <ProductCardSwiper images={images} />
          </div>
        </Link>

        <div className={styles.product__infos}>
          <h3>
            {product.name.length > 30
              ? `${product.name.substring(0, 25)}...`
              : product.name}
          </h3>

          <span>
            {prices.length === 1
              ? prices[0].toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              : prices[prices.length - 1] - prices[0] == 0
              ? "R$0,00"
              : (prices[prices.length - 1] - prices[0]).toLocaleString(
                  "pt-br",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
          </span>
          {product.subProducts[active].discount === 0 ? (
            <div className={styles.discount} style={{ fontWeight: "600" }}>
              Gratuito
            </div>
          ) : (
            <div
              className={styles.discount}
              style={{ fontSize: "18px", fontWeight: "600" }}
            >
              {product.subProducts[active].discount.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
          )}

          <div className={styles.product__colors}>
            {styless &&
              styless.map((style, i) =>
                style.image ? (
                  <img
                    src={style.image}
                    className={i == active && styles.active}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images)
                      setActive(i)
                    }}
                    alt=""
                  />
                ) : (
                  <span
                    style={{ backgroundColor: `${style.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images)
                      setActive(i)
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
