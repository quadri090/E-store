"use client";
import { CartProductType, SelectedImgType } from "@/app/product/ProductDetails";
import React from "react";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: ( value: SelectedImgType ) => void
};

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {

  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.colorCode}
                onClick={() => handleColorSelect(image)}
                className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${cartProduct.selectedImage.color === image.color ? "border-[1.5px]" : "border-none"}`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;

// handleColorSelect function type is passed as a prop to the setColor component. The function will be called in SetColor component itself, but its valus will come from the parent component to SetColor component
