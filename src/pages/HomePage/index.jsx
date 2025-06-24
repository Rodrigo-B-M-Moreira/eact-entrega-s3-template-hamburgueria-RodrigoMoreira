import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import "../../styles/global.scss";

export const HomePage = () => {
   const [productList, setProductList] = useState([]);


   const [cartList, setCartList] = useState([]);


   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await fetch(
               "https://hamburgueria-kenzie-json-serve.herokuapp.com/products"
            );
            if (!response.ok) throw new Error("Erro ao buscar produtos");
            const data = await response.json();
            setProductList(data);
         } catch (error) {
            console.error(error);
         }
      };

      fetchProducts();
   }, []);

   useEffect(() => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
         setCartList(JSON.parse(savedCart));
      }
   }, []);


   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartList));
   }, [cartList]);


   const addToCart = (product) => {
      setCartList((prevCart) => {
         const existingItem = prevCart.find(
            (item) => item.product.id === product.id
         );
         if (existingItem) {
            return prevCart.map((item) =>
               item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         } else {
            return [...prevCart, { product, quantity: 1 }];
         }
      });
   };


   const removeFromCart = (productId) => {
      setCartList((prevCart) => {
         const item = prevCart.find((item) => item.product.id === productId);
         if (!item) return prevCart;

         if (item.quantity === 1) {
            return prevCart.filter((item) => item.product.id !== productId);
         } else {
            return prevCart.map((item) =>
               item.product.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
            );
         }
      });
   };


   const clearCart = () => {
      setCartList([]);
   };


   const total = cartList.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
   );

   return (
      <>
         <Header />
         <main>
            <ProductList productList={productList} addToCart={addToCart} />

            {/* Passe a lógica e total para CartModal */}
            <CartModal
               cartList={cartList}
               removeFromCart={removeFromCart}
               clearCart={clearCart}
               total={total}
            />
         </main>
      </>
   );
};





// useEffect montagem - carrega os produtos da API e joga em productList
// useEffect atualização - salva os produtos no localStorage (carregar no estado)
// adição, exclusão, e exclusão geral do carrinho
// renderizações condições e o estado para exibir ou não o carrinho
// filtro de busca
// estilizar tudo com sass de forma responsiva
