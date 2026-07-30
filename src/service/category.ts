import {api} from "./api";

export const getCategory = async () => {
  const response = await api.get("/products/category-list");
  return response.data;
};

export const getProductByCategory = async (category: string) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
