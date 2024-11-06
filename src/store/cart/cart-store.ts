import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  //removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto ya existe en el carrito
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2. Se que el producto existe por talla, tengo q incrementar la cantidad
        const updateCartProducts = cart.map((item) => {
          if (item.id == product.id && item.size == product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }

          return item;
        });

        set({ cart: updateCartProducts });
      },

      updateProductQuantity(product: CartProduct, quantity: number) {
        const { cart } = get();

        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity,
            }
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
