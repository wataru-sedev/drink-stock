import { BottleWine, Package } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 md:mb-12 md:text-4xl">
          管理メニュー
        </h1>
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <Link href="/drink" className="group flex-1 rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            <h2 className="flex mb-3 text-2xl font-semibold">
              <BottleWine />
              ドリンク管理
            </h2>
            <p className="m-0 text-gray-600">
              ドリンクの在庫チェックはこちらから。
            </p>
          </Link>
          <Link href="/equipment" className="group flex-1 rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            <h2 className="flex mb-3 text-2xl font-semibold">
              <Package />
              備品管理
            </h2>
            <p className="m-0 text-gray-600">
              備品の在庫チェックはこちらから。
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}