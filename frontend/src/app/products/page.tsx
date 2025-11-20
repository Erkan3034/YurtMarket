"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDorms, fetchProducts } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

export default function ProductsPage() {
  const [filters, setFilters] = useState<{ dormId?: string; category?: string }>({});
  const dormsQuery = useQuery({ queryKey: ["dorms"], queryFn: fetchDorms });
  const productsQuery = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Market</p>
          <h1 className="text-3xl font-semibold text-slate-900">Ürün kataloğu</h1>
          <p className="text-sm text-slate-500">Yurt ve kategori filtreniz ile anlık stokları görüntüleyin.</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <Select
            value={filters.dormId ?? ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, dormId: e.target.value || undefined }))}
            options={[
              { value: "", label: "Tüm Yurtlar" },
              ...(dormsQuery.data?.map((dorm) => ({ value: dorm.id, label: dorm.name })) ?? []),
            ]}
          />
          <input
            className="h-11 rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Kategori (ör. elektronik)"
            value={filters.category ?? ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value || undefined }))}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {productsQuery.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Spinner /> Ürünler yükleniyor
          </div>
        ) : productsQuery.data && productsQuery.data.length > 0 ? (
          productsQuery.data.map((product) => (
            <Card key={product.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                <span className="text-sm font-semibold text-indigo-600">{product.price} ₺</span>
              </div>
              <p className="text-sm text-slate-600">{product.description}</p>
              <div className="text-xs text-slate-500">Stok: {product.stock}</div>
            </Card>
          ))
        ) : (
          <p className="text-sm text-slate-500">Bu filtrede ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

