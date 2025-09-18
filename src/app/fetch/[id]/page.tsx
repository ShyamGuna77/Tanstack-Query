/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProductById, type Product } from "@/lib/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FetchProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!Number.isFinite(id)) return;
    let isMounted = true;
    setStatus("pending");
    fetchProductById(id)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
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
  }, [id]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link href="/fetch">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-2xl text-black">
            {product?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="w-full aspect-square bg-white/50 flex items-center justify-center rounded-md">
              <img
                src={product?.image}
                alt={product?.title ?? ""}
                className="h-80 object-contain"
              />
            </div>
            <div>
              <p className="text-base text-gray-800 mb-3">
                {product?.description}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-semibold text-black">
                  ${product?.price}
                </span>
                <span className="text-sm text-gray-600">
                  {product?.category}
                </span>
              </div>
              <div className="text-sm text-gray-700 space-x-4">
                <span>
                  Rating: <strong>{product?.rating.rate}</strong>
                </span>
                <span>
                  Reviews: <strong>{product?.rating.count}</strong>
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
