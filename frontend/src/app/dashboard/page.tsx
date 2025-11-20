"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { applySeller, createProduct, fetchDorms, fetchProducts, fetchPopularSellers } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [selectedDorm, setSelectedDorm] = useState<string>();
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });

  const dormsQuery = useQuery({ queryKey: ["dorms"], queryFn: fetchDorms });
  const sellersQuery = useQuery({ queryKey: ["sellers", "popular"], queryFn: fetchPopularSellers });
  const productsQuery = useQuery({
    queryKey: ["products", selectedDorm],
    queryFn: () => fetchProducts(selectedDorm ? { dormId: selectedDorm } : undefined),
  });

  const applyMutation = useMutation({
    mutationFn: () => applySeller(user?.id ?? ""),
  });

  const productMutation = useMutation({
    mutationFn: () =>
      createProduct({
        sellerId: user?.id ?? "",
        name: productForm.name,
        description: productForm.description,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        categoryId: productForm.categoryId,
      }),
    onSuccess: () => {
      setProductForm({ name: "", description: "", price: "", stock: "", categoryId: "" });
      productsQuery.refetch();
    },
  });

  const isSeller = sellersQuery.data?.some((seller) => seller.id === user?.id);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Hoş geldin</p>
          <h1 className="text-3xl font-semibold text-slate-900">{user?.name ?? "Misafir"}</h1>
        </div>
        {!isSeller && (
          <Button disabled={applyMutation.isPending || !user} onClick={() => applyMutation.mutate()}>
            {applyMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Başvurun gönderiliyor
              </span>
            ) : (
              "Satıcı Başvurusu Yap"
            )}
          </Button>
        )}
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Popüler satıcı</p>
          <p className="text-2xl font-semibold text-slate-900">
            {sellersQuery.data?.[0]?.id ? `#${sellersQuery.data[0].id.slice(0, 6)}` : "-"}
          </p>
          <p className="text-sm text-slate-500">Ortalama puan {sellersQuery.data?.[0]?.ratingAvg ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Toplam ürün</p>
          <p className="text-2xl font-semibold text-slate-900">{productsQuery.data?.length ?? 0}</p>
          <p className="text-sm text-slate-500">Dorm filtresi ile gerçek zamanlı</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Yurt sayısı</p>
          <p className="text-2xl font-semibold text-slate-900">{dormsQuery.data?.length ?? 0}</p>
          <p className="text-sm text-slate-500">Supabase verisinden çekilir</p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Ürünler</h2>
              <p className="text-sm text-slate-500">Dorm seçerek ilanları filtrele</p>
            </div>
            <Select
              value={selectedDorm ?? ""}
              onChange={(e) => setSelectedDorm(e.target.value || undefined)}
              options={[
                { value: "", label: "Tüm Yurtlar" },
                ...(dormsQuery.data?.map((dorm) => ({ value: dorm.id, label: dorm.name })) ?? []),
              ]}
            />
          </div>
          <div className="grid gap-3">
            {productsQuery.isLoading ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Spinner /> Ürünler yükleniyor
              </div>
            ) : productsQuery.data && productsQuery.data.length > 0 ? (
              productsQuery.data.map((product) => (
                <div key={product.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-base font-semibold text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                    <span>{product.price} ₺</span>
                    <span>Stok: {product.stock}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">Bu filtre için henüz ürün yok.</p>
            )}
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Yeni Ürün Ekle</h2>
          <Input
            label="Ürün Adı"
            value={productForm.name}
            onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label="Açıklama"
            value={productForm.description}
            onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Fiyat"
              type="number"
              value={productForm.price}
              onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
            />
            <Input
              label="Stok"
              type="number"
              value={productForm.stock}
              onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
            />
          </div>
          <Input
            label="Kategori"
            value={productForm.categoryId}
            onChange={(e) => setProductForm((prev) => ({ ...prev, categoryId: e.target.value }))}
            placeholder="Örn. elektronik"
          />
          <Button
            disabled={productMutation.isPending || !user}
            onClick={() => productMutation.mutate()}
            type="button"
          >
            {productMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Spinner /> Kaydediliyor
              </span>
            ) : (
              "Ürünü Kaydet"
            )}
          </Button>
          {productMutation.error ? <p className="text-sm text-rose-500">{productMutation.error.message}</p> : null}
        </Card>
      </section>
    </div>
  );
}

