import Image from 'next/future/image'
import Link from 'next/link'

import { urlFor } from '../lib/client'

export function HeroBanner({ heroBanner }) {
  const { smallText, midText, largeText1, image, product, buttonText, description } = heroBanner

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${product}`}>
            <a>
              <button type="button">{buttonText}</button>
            </a>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
