"use client";

import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-5xl flex-col gap-10 px-4 py-10 lg:flex-row">
      <Card className="flex-1 space-y-6 bg-white/90">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Geri geldin!</p>
          <h1 className="text-3xl font-semibold text-slate-900">Paneline giriş yap</h1>
          <p className="text-sm text-slate-600">Satıcı başvurularını yönet, yeni ürün ekle ya da sipariş durumunu güncelle.</p>
        </div>
        <LoginForm />
        <p className="text-sm text-slate-600">
          Hesabın yok mu?{" "}
          <Link href="/register" className="font-semibold text-indigo-600">
            Hemen kayıt ol
          </Link>
        </p>
      </Card>
      <Card className="flex-1 bg-slate-900 text-white">
        <h2 className="text-2xl font-semibold">Neden Yurt Market?</h2>
        <ul className="mt-6 space-y-4 text-sm text-slate-200">
          <li>• Supabase Auth ile güvenli kullanıcı yönetimi</li>
          <li>• Prisma + Fastify performanslı API</li>
          <li>• Responsive dashboard ve gerçek zamanlı istatistikler</li>
        </ul>
        <Button asChild className="mt-8 bg-white text-slate-900 hover:bg-slate-100">
          <Link href="/dashboard">Demo paneli gör</Link>
        </Button>
      </Card>
    </div>
  );
}

