import Link from 'next/link'

import { urlFor } from '../lib/client'

export function FooterBanner({ footerBanner }) {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    description
  } = footerBanner
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{description}</p>

          <Link href={`/product/${product}`}>
            <a>
              <button type="button">{buttonText}</button>
            </a>
          </Link>
        </div>

        <img src={urlFor(image)} alt={smallText} className="footer-banner-image" />
      </div>
    </div>
  )
}
