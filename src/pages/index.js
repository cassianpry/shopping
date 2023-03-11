import { useSession, signIn, signOut } from "next-auth/react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import axios from "axios"

export default function Home({ country }) {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      <Header country={country} />
      {session ? "Você esta logado!" : "Você não esta logado!"}
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
