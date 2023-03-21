import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import Countdown from "@/components/countDown"
import { VscSymbolEvent } from "react-icons/vsc"

import "swiper/css"
import "swiper/css/navigation"
import styles from "./styles.module.scss"
import { flashDealsArray } from "@/data/home"
import FlashDealsCard from "./Card"
import { MdOutlineTimer } from "react-icons/md"

export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          <VscSymbolEvent />
          &nbsp;Promoções
        </h1>
        <div className={styles.flashDeals__header__countdown}>
          <h2>
            Termina em: <MdOutlineTimer />
          </h2>
          <Countdown date={new Date(2023, 11, 31)} />
        </div>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          360: { slidesPerView: 1 },
          736: { slidesPerView: 2 },
          990: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1560: { slidesPerView: 5 },
        }}
        className="flashDeals__swiper"
      >
        <div className={styles.flashDeals__list}>
          {flashDealsArray.map((item) => (
            <SwiperSlide key={item.id}>
              <FlashDealsCard product={item} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  )
}
