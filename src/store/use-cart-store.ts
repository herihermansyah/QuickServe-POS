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
      //   menbahkan product ke order list
      //  jika ada product yang sama maka quantity akan bertambah
      //   jika tidak ada product yang sama maka product akan di tambahkan
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
      //   menghapus cart berdasar kan id product
      romoveFromCart(id) {
        set((state) => {
          return {
            cartItems: state.cartItems.filter((item) => item.product.id !== id),
          };
        });
      },

      //   menambah quantity product dan mnghitung total harga dengan qunaity yang baru
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

      //   mengurangi qunaity product dan menghapus jika product sama dengan 1,
      // dan menghitung total harga dengan quantity yang baru
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

      //   menghitung subtotal, total discount, tax amount, dan grand total

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
