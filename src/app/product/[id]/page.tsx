/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductById, fetchProducts, Product } from "@/lib/api";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function getProduct(id: number) {
  return {
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 5,
  };
}

function getProducts() {
  return {
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60 * 5,
  };
}

function useProduct(id: number) {
  const queryClient = useQueryClient();
  return useQuery<Product>({
    ...getProduct(id),
    placeholderData: () => {
      const products = queryClient.getQueryData<Product[]>(
        getProducts().queryKey
      );
      return products?.find((p) => p.id === id);
    },
  });
}

export default function ProductPage({ params }: { params:{ id: string } }) {
  const id = Number(params.id);
  const { data, isError, status } = useProduct(id);
  if (status === "pending") return <div className="text-center flex items-center justify-center h-screen">Loading...</div>;
  if (status === "error")
    return <div>Error: {(isError as unknown as Error).message}</div>;
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link href="/product">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-2xl text-black">{data?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="w-full aspect-square bg-white/50 flex items-center justify-center rounded-md">
              <img
                src={data?.image}
                alt={data?.title}
                className="h-80 object-contain"
              />
            </div>
            <div>
              <p className="text-base text-gray-800 mb-3">
                {data?.description}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-semibold text-black">
                  ${data?.price}
                </span>
                <span className="text-sm text-gray-600">{data?.category}</span>
              </div>
              <div className="text-sm text-gray-700 space-x-4">
                <span>
                  Rating: <strong>{data?.rating.rate}</strong>
                </span>
                <span>
                  Reviews: <strong>{data?.rating.count}</strong>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button className="w-full">Add to Cart</Button>
          <Button variant="secondary" className="w-full">
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
