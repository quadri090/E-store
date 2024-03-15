"use client"

import { CartProductType, SelectedImgType } from "@/app/product/ProductDetails"
import Image from "next/image"

interface ProductImageProps{
    cartProduct: CartProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void
}
const ProductImage:React.FC<ProductImageProps> = ({
    cartProduct, product, handleColorSelect
}) => {
    const dimension = "max-h-[500px] min-h-[300px] sm:min-h-[400px]"

  return (
    <div className={`grid grid-cols-6 gap-2 ${dimension}`}>
        <div className={`flex flex-col items-center justify-center gap-4 cursor-pointer border h-full ${dimension}`}>
            {product.images.map((image: SelectedImgType) => {
                return (
                    <div key={image.colorCode} onClick={() => handleColorSelect(image)} className={`${cartProduct.selectedImage.color === image.color ? "border-[1.5px" : "border-none"} relative w-[80%] aspect-square rounded border-teal-300`}>
                        <Image 
                        src={image.image}
                        alt="Product Image"
                        fill
                        className="object-contain"
                        />
                    </div>
                )
            })}
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image
            fill
            alt="current"
            src={cartProduct.selectedImage.image}
            className={`h-full object-contain ${dimension}`}
            />
        </div>
    </div>
  )
}

export default ProductImage