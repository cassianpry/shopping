import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import store from "@/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import Head from "next/head"
import "@/styles/globals.scss"

let persistor = persistStore(store)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Shop Next App</title>
        <meta name="description" content="Shop using NextJS, Redux, MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate Loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  )
}
