import { useEffect, useState } from 'react'

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { Product } from '../../components'
import { useGlobalContext } from '../../context/StateContext'
import { client, urlFor } from '../../lib/client'

export default function ProductDetails({ product, products }) {
  const { image, name, details, price } = product

  const [qty, setQty] = useState(1)
  const [index, setIndex] = useState(0)

  const { onAdd, setShowCart } = useGlobalContext()

  useEffect(() => {
    setQty(1)
  }, [product])

  const incQty = () => {
    setQty((prevState) => prevState + 1)
  }

  const decQty = () => {
    setQty((prevState) => {
      if (prevState - 1 < 1) return 1
      return prevState - 1
    })
  }

  const handleBuyNow = () => {
    onAdd(product, qty)

    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img className="product-detail-image" src={urlFor(image[index])} alt="" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                key={i}
                className={`${i === index ? 'small-image selected-image' : 'small-image'}`}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className={`maylike-products-container track`}>
            {products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async (ctx) => {
  const query = `*[_type== "product"] {
    slug {
      current
    }
  }`
  const products = await client.fetch(query)

  const paths = products.map(({ slug }) => ({
    params: {
      slug: slug.current
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`
  const productsQuery = `*[_type == "product"]`
  const [product, products] = await Promise.all([client.fetch(query), client.fetch(productsQuery)])
  return {
    props: {
      product,
      products
    },
    revalidate: 60
  }
}
