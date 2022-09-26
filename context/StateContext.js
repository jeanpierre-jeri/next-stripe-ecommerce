import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)

  const onRemove = (id) => {
    const foundProduct = cartItems.find((c) => c._id === id)
    const filterCartItems = cartItems.filter((c) => c._id !== id)

    setCartItems(filterCartItems)
    setTotalPrice((prevState) => prevState - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prevState) => prevState - foundProduct.quantity)
  }

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = [...cartItems]
    const foundProductIndex = cartItems.findIndex((item) => item._id === id)
    const product = updatedCartItems[foundProductIndex]

    if (value === 'inc') {
      product.quantity = product.quantity + 1
      setCartItems(updatedCartItems)

      setTotalPrice((prevState) => prevState + product.price)
      setTotalQuantities((prevState) => prevState + 1)
    }

    if (value === 'dec' && product.quantity > 1) {
      product.quantity = product.quantity - 1
      setCartItems(updatedCartItems)

      setTotalPrice((prevState) => prevState - product.price)
      setTotalQuantities((prevState) => prevState - 1)
    }
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    setTotalPrice((prevState) => prevState + product.price * quantity)
    setTotalQuantities((prevState) => prevState + quantity)

    if (!checkProductInCart) {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    } else {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        }
        return cartProduct
      })

      setCartItems(updatedCartItems)
    }
    toast.success(`${quantity} ${product.name} added to cart`)
  }

  return (
    <Context.Provider
      value={{
        cartItems,
        showCart,
        totalPrice,
        totalQuantities,
        onAdd,
        setShowCart,
        onRemove,
        toggleCartItemQuantity
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a ContextProvider')
  }
  return context
}
