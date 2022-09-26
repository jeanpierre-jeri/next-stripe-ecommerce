import Head from 'next/head'
import { Footer, Navbar } from './'

export function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Headphones Store</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="main-container">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}
