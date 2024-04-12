import { CartProductType } from "@/app/product/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
    paymentIntent: String | null
    handlePaymentIntent: (value: string | null) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props{
    [propName: string] : any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)


    //this logic gets the cartitems and paymentintent information stored in the browser storage if it exists there.
    useEffect(() => {
        const cartItems: any = localStorage.getItem('eStoreCartItems')
        const storageProducts: CartProductType[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent:any = localStorage.getItem('eShopPaymentIntent')
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent) 

        setCartProducts(storageProducts)
        setPaymentIntent(paymentIntent)
    }, [])


    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
            
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                        const itemTotal = item.price * item.quantity
    
                        acc.total += itemTotal
                        acc.qty += item.quantity
    
                        return acc
                }, {
                    total: 0,
                    qty: 0
                })
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        }

        getTotals()
    }, [cartProducts])


    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Product added to cart');
            //storing cartitems info in local storage
            localStorage.setItem('eStoreCartItems', JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, [])


    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
            if(cartProducts) {
                const filteredProducts = cartProducts.filter((item) => {
                    return item.id !== product.id
                })
                setCartProducts(filteredProducts)
                toast.success('Product removed from cart')
                localStorage.setItem('eStoreCartItems', JSON.stringify(filteredProducts))
                return filteredProducts;
            } 
        
    }, [cartProducts])


    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if(product.quantity === 99) {
            return toast.error("Oops! maximum reached")
        }

        if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
              );

              if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
              }

              setCartProducts(updatedCart)
              localStorage.setItem('eStoreCartItems', JSON.stringify(updatedCart))
        }

    }, [cartProducts])


    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if(product.quantity === 1) {
            return toast.error("Click 'Remove' button to remove item from cart'")
        }

        if(cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
              );

              if(existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
              }

              setCartProducts(updatedCart)
              localStorage.setItem('eStoreCartItems', JSON.stringify(updatedCart))
        }
        
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eStoreCartItems', JSON.stringify(null))
        toast.success('Cart Cleared')

    }, [])

    const handlePaymentIntent = useCallback((value: string | null) => {
        setPaymentIntent(value)
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(value))
    }, [paymentIntent])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handlePaymentIntent
    }

    return <CartContext.Provider value={value} {...props}/>
};


//This hook that can be used in any component nested as children within the CartContextProvider component to access the values of the CartContext
export const useCart = () => {
    const context = useContext(CartContext)

    if(context === null) {
        throw new Error("usecart must be used wiyhin a CartContextProvider")
    }

    return context
}