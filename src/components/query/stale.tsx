/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

async function getAllproducts() {
  const res = await fetch("https://fakestoreapi.com/products/");
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

const StaleTime = () => {
  type Product = {
    id: number;
    title: string;
    image: string;
  };

  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllproducts(),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 1,
  });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {(error as Error).message}</div>}
      {Array.isArray(data) && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: { id: number; title: string; image: string }) => (
            <div
              key={product.id}
              className="text-xl font-bold text-black mb-4 mt-2"
            >
              {product.title}
              <img
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className="w-64 h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaleTime;
