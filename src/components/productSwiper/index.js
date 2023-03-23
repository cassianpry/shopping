import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper"

import styles from "./styles.module.scss"

export default function ProductsSwiper({ header, products, background }) {
  return (
    <div className={styles.wrapper}>
      {header && (
        <div className={styles.header} style={{ background: `${background}` }}>
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={{
          360: { slidesPerView: 1 },
          736: { slidesPerView: 2 },
          990: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1560: { slidesPerView: 6 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className={styles.product}>
              <div className={styles.product__img}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.product__infos}>
                <h1>
                  {product.name.length > 55 ? (
                    `${product.name.slice(0, 20)}...`
                  ) : (
                    <span>{product.name}</span>
                  )}
                </h1>
                <span>
                  {product.price &&
                    parseFloat(product.price).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
