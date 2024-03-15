"use client";
import { CartProductType } from "@/app/product/ProductDetails";
import React from "react";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return <div className="flex gap-8 items-center">
    {cartCounter ? null : <div className="font-semibold">QUANTITY</div>}
    <div className="flex gap-4 items-center text-base">
        <button className="border-[1.2px] border-slate-300 px-2 rounded" onClick={handleQtyDecrease}>-</button>
        <div>{cartProduct.quantity}</div>
        <button className="border-[1.2px] border-slate-300 px-2 rounded" onClick={handleQtyIncrease}>+</button>
    </div>
  </div>;
};

export default SetQuantity;

// SetQuantity component takes four parameters.
// cartProduct parameter is the CartProductType defined in the parent component(ProductDetails), we extract the value of quantity in the cartProduct state whose type is CartProductType.
//handleQtyIncrease and handleQtyDecrease are funtion types passed as parameters and called in this SetQuantity component. Their values(or real functions) however comes from the parent component(ProductDetails)
