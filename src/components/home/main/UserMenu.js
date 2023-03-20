import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Navigation } from "swiper"
import {
  VscComment,
  VscHeart,
  VscOutput,
  VscSettingsGear,
} from "react-icons/vsc"
import styles from "./styles.module.scss"
import "swiper/css"
import "swiper/css/effect-cards"
import { userSwiperArray } from "@/data/home"

export default function UserMenu() {
  const { data: session } = useSession()

  console.log(session)
  return (
    <div className={styles.user}>
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt="imagem de usuário" />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1632757699/avatars/avatar_espefx.jpg"
              alt="imagem de usuário"
            />
            <div className={styles.user__infos_btns}>
              <button
                className={styles.btn__primary}
                onClick={() => router.push("/signup")}
              >
                Registrar-se
              </button>
              <button className={styles.btn__outlined} onClick={() => signIn()}>
                Entrar
              </button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="/profile">
              <VscSettingsGear />
            </Link>
          </li>
          <li>
            <Link href="">
              <VscOutput />
            </Link>
          </li>
          <li>
            <Link href="">
              <VscComment />
            </Link>
          </li>
          <li>
            <Link href="">
              <VscHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="user__swiper"
            style={{
              maxWidth: "180px",
              height: "240px",
              marginTop: "1rem",
            }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide>
                <Link href="">
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
