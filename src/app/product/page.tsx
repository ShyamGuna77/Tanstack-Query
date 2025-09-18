/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { fetchProducts, Product } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const { data, isError, status } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60 * 5,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <div>Error: {(isError as unknown as Error).message}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data &&
          data.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="line-clamp-2 text-black">
                  {product.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-square bg-white/50 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 object-contain"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-black">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-600">
                    {product.category}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link href={`/product/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
