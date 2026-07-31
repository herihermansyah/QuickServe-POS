"use client";
import React, {useState} from "react";
import Image from "next/image";
import {Card, CardFooter, CardHeader, CardTitle} from "./ui/card";
import Button from "./ui/button";
import {IoCartOutline} from "react-icons/io5";
import {ProductTypes} from "@/types/product-types";
import {getProduct} from "@/service/product";
import {IoIosStar} from "react-icons/io";
import {calculateDiscount, formatCurrency} from "@/utils/format";
import {getProductByCategory} from "@/service/category";
import {useCartStore} from "@/store/use-cart-store";
interface ProductCardProps {
  searchQuery?: string;
  categoryQuery?: string;
}

const ProductCard = ({searchQuery, categoryQuery}: ProductCardProps) => {
  const [product, setProduct] = useState<ProductTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetching data from api service get product and get product by category
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = categoryQuery
          ? await getProductByCategory(categoryQuery)
          : await getProduct();
        setProduct(response.products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [categoryQuery]);

  // filtered product by search query
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery?.trim()) return product;
    return product.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [product, searchQuery]);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white p-2 h-full rounded-md shadow-dropdown overflow-y-auto">
      {isLoading ? (
        // loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {Array.from({length: 15}).map((_, i) => (
            <div
              key={i}
              className="h-60 w-full bg-gray-200 animate-pulse rounded-md"
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        // no product found
        <div className="text-center flex items-center justify-center h-full text-gray-300">
          <span>Product Search : ( ---- {searchQuery} ----) Not Found.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {/* Product Card */}
          {filteredProducts.map((product) => {
            const finalPrice = calculateDiscount(
              product.price,
              product.discountPercentage,
            );
            return (
              <Card key={product.id}>
                <div className="relative w-full h-50 overflow-hidden rounded-md border border-gray-300">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    className="object-contain"
                  />
                  <div className="absolute top-1 left-1 text-[10px] bg-green-700 text-white rounded-md py-1 px-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({length: 5}).map((_, i) => (
                        <div key={i}>
                          {i < Math.round(product.rating) ? (
                            <span className="text-orange-500">
                              <IoIosStar />
                            </span>
                          ) : (
                            <span className="text-gray-200">
                              <IoIosStar />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="bg-yellow-100 p-1 absolute top-1 right-1 rounded-md text-[10px] font-medium">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-[14px] line-through">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(finalPrice)}
                    </span>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button
                    onClick={() => addToCart({newProduct: product})}
                    size={"sm"}
                    aria-label="button add to cart"
                    className="w-full items-center justify-center"
                  >
                    <IoCartOutline size={20} />
                    add to cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
