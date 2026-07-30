import React, {Suspense} from "react";
import OrderPage from "@/components/order-page";
import Loading from "@/components/loading";

const page = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <OrderPage />
    </Suspense>
  );
};
export default page;
