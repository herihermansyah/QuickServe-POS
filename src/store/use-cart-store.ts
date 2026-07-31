import {ProductTypes} from "@/types/product-types";
import {calculateDiscount} from "@/utils/format";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface CartItemType {
  product: ProductTypes;
  quantity: number;
  unitPrice: number;
  originalPrice: number;
  totalPrice: number;
}

interface UserCartStoreType {
  cartItems: CartItemType[];
  addToCart: (params: {newProduct: ProductTypes}) => void;
  romoveFromCart: (id: string | number) => void;
  incrementQuantity: (id: string | number) => void;
  decrementQuantity: (id: string | number) => void;
  clearCart: () => void;
  getSummeryCart: () => {
    subTotal: number;
    totalDiscount: number;
    taxAmount: number;
    grandTotal: number;
  };
}

export const useCartStore = create<UserCartStoreType>()(
  persist(
    (set, get) => ({
      cartItems: [],
      // add product to order list
      // if product exist so quantity will be increase
      // if product not exist so product will be added
      addToCart: ({newProduct}) => {
        set((state) => {
          const isExist = state.cartItems.find(
            (item) => item.product.id === newProduct.id,
          );

          const finalPrice = calculateDiscount(
            newProduct.price,
            newProduct.discountPercentage,
          );

          if (isExist) {
            return {
              cartItems: state.cartItems.map((item) => {
                if (item.product.id === newProduct.id) {
                  const newQty = item.quantity + 1;
                  return {
                    ...item,
                    quantity: newQty,
                    totalPrice: item.unitPrice * newQty,
                  };
                }
                return item;
              }),
            };
          }
          return {
            cartItems: [
              ...state.cartItems,
              {
                product: newProduct,
                quantity: 1,
                originalPrice: newProduct.price,
                unitPrice: finalPrice,
                totalPrice: finalPrice,
              },
            ],
          };
        });
      },
      //   delete cart product from id
      romoveFromCart(id) {
        set((state) => {
          return {
            cartItems: state.cartItems.filter((item) => item.product.id !== id),
          };
        });
      },

      // add quantity and calculate total price with new quantity
      incrementQuantity(id) {
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.product.id === id) {
              const newQty = item.quantity + 1;
              return {
                ...item,
                quantity: newQty,
                totalPrice: item.unitPrice * newQty,
              };
            }
            return item;
          }),
        }));
      },

      // decrease quantity and delete if product is equal to 1
      // and calculate total price with new quantity
      decrementQuantity(id) {
        set((state) => {
          const targetItems = state.cartItems.find(
            (item) => item.product.id === id,
          );
          if (targetItems && targetItems.quantity === 1) {
            return {
              cartItems: state.cartItems.filter(
                (item) => item.product.id !== id,
              ),
            };
          }
          return {
            cartItems: state.cartItems.map((item) => {
              if (item.product.id === id) {
                const newQty = item.quantity - 1;
                return {
                  ...item,
                  quantity: newQty,
                  totalPrice: item.unitPrice * newQty,
                };
              }
              return item;
            }),
          };
        });
      },

      //   delete all cart / empty cart
      clearCart() {
        set({cartItems: []});
      },

      // get summery cart , calculate subtotal, total discount, tax amount, and grand total
      getSummeryCart() {
        const {cartItems} = get();
        const subTotal = cartItems.reduce(
          (acc, item) => acc + item.originalPrice * item.quantity,
          0,
        );
        const totalDiscount = cartItems.reduce(
          (acc, item) =>
            acc + (item.originalPrice - item.unitPrice) * item.quantity,
          0,
        );

        const taxRate = 0.11;
        const taxableAmount = subTotal - totalDiscount;
        const taxAmount = taxableAmount * taxRate;
        const grandTotal = taxableAmount + taxAmount;
        return {
          subTotal,
          totalDiscount,
          taxAmount,
          grandTotal,
        };
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({cartItems: state.cartItems}),
    },
  ),
);
