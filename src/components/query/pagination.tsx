"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

async function fetchProducts(page: number, limit: number): Promise<Product[]> {
  // FakeStore doesn’t support true page params, so we fetch all and slice
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const allProducts: Product[] = await res.json();

  const start = (page - 1) * limit;
  const end = start + limit;
  return allProducts.slice(start, end);
}

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const limit = 6; // products per page

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page, limit),
    placeholderData: keepPreviousData,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products (Page {page})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto object-contain"
            />
            <h2 className="text-sm font-semibold mt-2">{product.title}</h2>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-3 py-2 border rounded"
        >
          Previous
        </button>

        <button
          onClick={() => {
            if (!isPlaceholderData && data?.length === limit) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || data?.length !== limit}
          className="px-3 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
