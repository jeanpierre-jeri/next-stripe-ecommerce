import { useRef } from 'react'

import Link from 'next/link'

import toast from 'react-hot-toast'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShop,
  AiOutlineShopping
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'

import { useGlobalContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import { getStripe } from '../lib/getStripe'

export function Cart() {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } =
    useGlobalContext()

  const handleCheckout = async () => {
    const stripe = await getStripe()

    try {
      const resp = await fetch('/api/stripe', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cartItems)
      })

      const data = await resp.json()
      toast.loading('Redirecting...')
      console.log(data)

      stripe.redirectToCheckout({ sessionId: data.id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button className="btn" type="button" onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map(({ _id, image, name, price, quantity }) => (
              <div key={_id} className="product">
                <img
                  src={urlFor(image[0])}
                  className="cart-product-image"
                  alt="Cart Product Image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{name}</h5>
                    <h4>${price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => toggleCartItemQuantity(_id, 'dec')}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuantity(_id, 'inc')}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(_id)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
