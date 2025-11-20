import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  { title: "Yurt bazlı ürünler", description: "Öğrenciler bulundukları yurttaki ürünleri filtreleyerek güvenli alışveriş yapar." },
  { title: "Satıcı paneli", description: "Satıcılar başvurularını yönetir, stok ve sipariş durumlarını tek ekrandan izler." },
  { title: "Abonelik sistemi", description: "Premium satıcılar sınırsız ilan, öne çıkarılmış listeleme ve raporlara erişir." },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-10">
      <section className="flex flex-col gap-10 rounded-[40px] bg-white/80 p-10 shadow-lg shadow-indigo-100 md:flex-row md:items-center md:gap-16">
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700">
            Türkiye’nin ilk yurt pazaryeri
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Yurt arkadaşlarından güvenli <span className="text-indigo-600">alım-satım</span> deneyimi
          </h1>
          <p className="text-lg text-slate-600">
            Yurt Market; öğrencilerin aynı binada ihtiyaç fazlası ürünlerini paylaşmasını, abonelikli satıcıların stoklarını yönetmesini ve
            siparişleri takip etmesini sağlayan uçtan uca çözümdür.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/register">Hemen Ücretsiz Başla</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/login">Paneli Gör</Link>
            </Button>
          </div>
          <dl className="grid gap-6 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-900">18+ yurt</dt>
              <dd>Supabase filtreleriyle canlı veri</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Anlık stok</dt>
              <dd>Prisma & Fastify uyumu</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Responsive</dt>
              <dd>Mobil, tablet, masaüstü için optimize</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-1 flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white">
          <h3 className="text-lg font-semibold">Canlı Durum</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-300">Bugünkü sipariş</p>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-slate-300">Aktif satıcı</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-slate-300">Yeni ilan</p>
                <p className="text-2xl font-semibold">76</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl bg-indigo-600 px-8 py-10 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Gerçek zamanlı kontrol paneli</h3>
            <p className="text-indigo-100">
              Satıcı başvurusu, ürün ekleme, sipariş güncelleme ve değerlendirme akışı tek noktadan yönetilir.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/dashboard">Demo Panel</Link>
            </Button>
            <Button asChild>
              <Link href="/products">Ürünlere Göz At</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
