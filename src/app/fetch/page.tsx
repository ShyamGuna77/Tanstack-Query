/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProducts, type Product } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FetchProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setStatus("pending");
    fetchProducts()
      .then((data) => {
        if (!isMounted) return;
        setProducts(data);
        setStatus("success");
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setError(err as Error);
        setStatus("error");
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.map((product) => (
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
                <Link href={`/fetch/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
