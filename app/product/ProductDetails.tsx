"use client";

import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";
import SetColor from "../components/products/SetColor";
import SetQuantity from "../components/products/SetQuantity";
import Btn from "../components/Btn";
import ProductImage from "../components/products/ProductImage";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

//   console.log(cartProduct)

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prev) => {
            return {...prev, selectedImage: value}
        })

    },[cartProduct.selectedImage])

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return
        }

        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity+1 }
        })
    }, [cartProduct])

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return
        }
        
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity-1 }
        })
    }, [cartProduct])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage 
      cartProduct={cartProduct}
      product={product}
      handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div
          className={`${product.inStock ? "text-teal-600" : "text-rose-500"} font-semibold`}
        >
          {product.inStock ? "Instock" : "Out of Stock"}
        </div>
        <Horizontal />
        <div>
          <SetColor 
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
          />
        </div>
        <Horizontal />
        <SetQuantity 
            cartProduct={cartProduct}
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
        />
        <Horizontal />
        <div className="max-w-[200px]">
            <Btn 
            label="Add to cart"
            onClick={() => {}}
            />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;