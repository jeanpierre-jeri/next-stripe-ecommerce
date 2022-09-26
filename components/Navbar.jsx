import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { useGlobalContext } from '../context/StateContext'
import { Cart } from './'

export function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useGlobalContext()

  return (
    <div className="navbar-container">
      <Link href="/">
        <a className="logo">JP Headphones</a>
      </Link>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}
