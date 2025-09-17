"use client";
import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchProducts, fetchCategory } from "@/lib/api";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

function useCategories(products: Product[] | undefined) {
  const categories = Array.from(
    new Set(products?.map((p) => p.category) ?? [])
  );

  return useQueries({
    queries:
      categories.map((category) => ({
        queryKey: ["category", category],
        queryFn: () => fetchCategory(category),
      })) ?? [],
  });
}

export default function FakeStoreDashboard() {
  const products = useProducts();
  const categories = useCategories(products.data);

  if (products.isLoading) return <p>Loading products...</p>;
  if (products.isError) return <p>Error loading products</p>;

  return (
    <div>
      <h1>🛒 Fake Store Dashboard</h1>
      <h2>Total Products: {products.data?.length}</h2>

      <h3>Categories</h3>
      <ul>
        {categories.map((catQuery, i) => {
          const categoryName = products.data
            ? Array.from(new Set(products.data.map((p) => p.category)))[i]
            : "";

          if (catQuery.isLoading)
            return <li key={i}>Loading {categoryName}...</li>;
          if (catQuery.isError)
            return <li key={i}>Error loading {categoryName}</li>;

          return (
            <li key={i}>
              <strong>{categoryName}</strong> — {catQuery.data?.length ?? 0}{" "}
              products
            </li>
          );
        })}
      </ul>
    </div>
  );
}
