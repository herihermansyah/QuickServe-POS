export const calculateDiscount = (price: number, discount: number) => {
  const discountAmount = price * (discount / 100);
  const finalPrice = price - discountAmount;
  return finalPrice;
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
