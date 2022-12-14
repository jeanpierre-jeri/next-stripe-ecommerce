import Link from 'next/link'

import { urlFor } from '../lib/client'

export function Product({ product }) {
  const { image, name, slug, price } = product

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <a>
          <div className="product-card">
            <img
              src={urlFor(image && image[0])}
              width={250}
              height={250}
              className="product-image"
            />

            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
