"use client"

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import Heading from '../components/Heading'
import Btn from '../components/Btn'
import ItemContent from './ItemContent'
import { formatPrice } from '@/utils/formatPrice'

const CartClient = () => {
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart()

    if(!cartProducts || cartProducts.length === 0) {
        return (
            <div className='flex flex-col items-center '>

                <div className='text-2xl'>Your cart is empty</div>
                <div>
                    <Link href="/" className='flex gap-1 text-slate-500 items-center mt-2'>
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }

  return (
    <div>
        <Heading title="Shopping Cart" center />
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
            <div className='col-span-2 justify-self-start'>PRODUCT</div>
            <div className='justify-self-center'>PRICE</div>
            <div className='justify-self-center'>QUANTITY</div>
            <div className='justify-self-end'>TOTAL</div>
        </div>

        <div>
            {cartProducts && cartProducts.map((cartProduct) => {
                return <ItemContent key={cartProduct.id} item={cartProduct}></ItemContent>
            })}
        </div> 

        <div className='border-t-[1.15px] border-slate-200 py-4 gap-4 flex justify-between'>
            <div className='max-w-[100px'>
                <Btn 
                label="Clear Cart"
                onClick={() => handleClearCart()}
                small
                outline
                />
            </div>
            <div className='text-sm flex flex-col gap-1 items-start'>
                <div className='flex justify-between w-full text-base font-semibold'>
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <p className='text-slate-500'>Taxes and Shipping Calculated at Checkout</p>
                <Btn
                label="Checkout"
                onClick={() => {}}
                />
                 <Link href="/" className='flex gap-1 text-slate-500 items-center mt-2'>
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CartClient