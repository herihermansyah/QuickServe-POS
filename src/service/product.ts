  import {api} from "./api";

  export const getProduct = async () => {
    const response = await api.get("/products?limit=0");
    return response.data;
  };
