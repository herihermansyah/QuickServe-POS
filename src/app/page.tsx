import React, {Suspense} from "react";
import OrderPage from "@/components/order-page";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPage />
    </Suspense>
  );
};
export default page;
