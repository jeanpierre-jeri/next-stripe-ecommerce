import { useState, useEffect } from 'react'

import Link from 'next/link'

import { BsBagCheckFill } from 'react-icons/bs'

import { useGlobalContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

export default function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useGlobalContext()

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFireworks()
  }, [setCartItems, setTotalPrice, setTotalQuantities])

  return (
    <div className="success-warpper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check you email inbox for the repeipt.</p>
        <p className="description">
          If you have any questions please email
          <a className="email" href="mailto:orders@example.com">
            orders@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}
