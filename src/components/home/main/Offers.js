import { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { offersAarray } from "@/data/home"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import styles from "./styles.module.scss"

import { Pagination, Navigation } from "swiper"
import Link from "next/link"

export default function Offers() {
  return (
    <div className={styles.offers}>
      {/* <div className={styles.offers__text}>
        <p>
          Utilize o código <b>"LERO1234"</b> para 30% de desconto em todos os
          produtos.
        </p>
        <Link href="/browse">Ir as compras!</Link>
      </div> */}
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersAarray.map((offer) => (
          <SwiperSlide key={offer.image}>
            <Link href="">
              <img src={offer.image} alt="" />
            </Link>
            <span>R$ {offer.price}</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
