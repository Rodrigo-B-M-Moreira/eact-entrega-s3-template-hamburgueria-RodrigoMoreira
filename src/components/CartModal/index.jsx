import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import "./CartModal.scss";

export const CartModal = ({
   cartList,
   removeFromCart,
   clearCart,
   total,
   onClose, 
}) => {
   return (
      <div role="dialog" className="cart-modal">
         <div className="cart-header">
            <h2>Carrinho de compras</h2>
            <button aria-label="close" title="Fechar" onClick={onClose}>
               <MdClose size={21} />
            </button>
         </div>

         <div className="cart-content">
            {cartList.length === 0 ? (
               <p>Seu carrinho está vazio.</p>
            ) : (
               <ul>
                  {cartList.map(({ product, quantity }) => (
                     <CartItemCard
                        key={product.id}
                        product={product}
                        quantity={quantity}
                        removeFromCart={removeFromCart}
                     />
                  ))}
               </ul>
            )}
         </div>

         <div className="cart-footer">
            <div className="total">
               <span>Total</span>
               <span>
                  {total.toLocaleString("pt-BR", {
                     style: "currency",
                     currency: "BRL",
                  })}
               </span>
            </div>

            <button onClick={clearCart} disabled={cartList.length === 0}>
               Remover todos
            </button>
         </div>
      </div>
   );
};
