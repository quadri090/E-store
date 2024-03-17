import Container from "@/app/components/Container";
import { products } from "@/utils/products";
import ProductDetails from "../ProductDetails";
import ListRating from "./ListRating";

interface ProductParams {
  productId?: string;
}

const ProductPage = ({ params }: { params: ProductParams }) => {

  const product = products.find((item) => item.id === params.productId)
  // console.log("params", params);
  return (
    <div className="md:p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Rate Product</div>
          <ListRating product={product}/>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
