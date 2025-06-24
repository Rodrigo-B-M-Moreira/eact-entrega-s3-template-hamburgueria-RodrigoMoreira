import { MdDelete } from "react-icons/md";
import "./CartItemCard.scss";

export const CartItemCard = ({ product, quantity, removeFromCart }) => {
   return (
      <li className="cart-item-card">
         <div>
            <img src={product.img} alt={product.name} />
            <div>
               <h3>{product.name}</h3>
               <p>Quantidade: {quantity}</p>
               <p>
                  Preço unitário:{" "}
                  {product.price.toLocaleString("pt-BR", {
                     style: "currency",
                     currency: "BRL",
                  })}
               </p>
               <p>
                  Subtotal:{" "}
                  {(product.price * quantity).toLocaleString("pt-BR", {
                     style: "currency",
                     currency: "BRL",
                  })}
               </p>
            </div>
         </div>
         <button
            aria-label={`Remover um ${product.name}`}
            title="Remover item"
            onClick={() => removeFromCart(product.id)}
         >
            <MdDelete size={21} />
         </button>
      </li>
   );
};

