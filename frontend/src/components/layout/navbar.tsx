"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          yurt.market
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Link href="/dashboard" className="hover:text-slate-900">
            Panel
          </Link>
          <Link href="/products" className="hover:text-slate-900">
            Ürünler
          </Link>
          {user ? (
            <Button variant="ghost" onClick={logout}>
              Çıkış
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/login">Giriş Yap</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

