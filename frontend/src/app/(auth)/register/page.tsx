"use client";

import Link from "next/link";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-5xl flex-col gap-10 px-4 py-10 lg:flex-row">
      <Card className="flex-1 bg-white/90">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Dakikalar içinde başla</p>
          <h1 className="text-3xl font-semibold text-slate-900">Yurt Market’e kayıt ol</h1>
          <p className="text-sm text-slate-600">
            Aynı yurttaki öğrencilerle güvenle alışveriş yapmak, ürünlerini sergilemek ve siparişlerini yönetmek için ücretsiz hesap oluştur.
          </p>
        </div>
        <div className="mt-6">
          <RegisterForm />
        </div>
        <p className="pt-4 text-sm text-slate-600">
          Hesabın var mı?{" "}
          <Link href="/login" className="font-semibold text-indigo-600">
            Giriş yap
          </Link>
        </p>
      </Card>
      <Card className="flex-1 bg-indigo-600 text-white">
        <h2 className="text-2xl font-semibold">Kayıt sonrası seni neler bekliyor?</h2>
        <ul className="mt-6 space-y-4 text-sm text-indigo-100">
          <li>• Dorm bazlı ürün keşfi ve filtreleme</li>
          <li>• Satıcı başvuru süreci ve abonelik yükseltmeleri</li>
          <li>• Sipariş, değerlendirme ve stok yönetimi</li>
        </ul>
      </Card>
    </div>
  );
}

