import { ProductCard } from "./ProductCard";
import "./ProductList.scss";

export const ProductList = ({ productList, addToCart }) => {
   return (
      <ul>
         {productList.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
         ))}
      </ul>
   );
};
