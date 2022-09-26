import { Toaster } from 'react-hot-toast'

import { Layout } from '../components'
import { ContextProvider } from '../context/StateContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
