"use Client";
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import SetQuantity from "../components/products/SetQuantity";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease} = useCart()

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
                <Image 
                src={item.selectedImage.image}
                alt={item.name}
                fill
                className="object-contain"
                />
            </div>
        </Link>
        <div className="flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>
                {truncateText(item.name)}
            </Link>
            <div>{item.selectedImage.color}</div>
            <div className="w-[70px]">
                <button className="outline outline-[1px] px-1.5 py-[2px] bg-slate-300 text-xs rounded-sm" onClick={() => handleRemoveProductFromCart(item)}>Remove</button>
            </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity 
            cartCounter
            cartProduct={item}
            handleQtyIncrease={() => handleCartQtyIncrease(item)}
            handleQtyDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className="justify-self-end ">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
