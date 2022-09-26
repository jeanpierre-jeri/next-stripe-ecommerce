import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData} />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const query = '*[_type== "product"]'
  const bannerQuery = '*[_type=="banner"]'

  const [products, bannerData] = await Promise.all([client.fetch(query), client.fetch(bannerQuery)])
  return {
    props: {
      products,
      bannerData: bannerData[0]
    }
  }
}
