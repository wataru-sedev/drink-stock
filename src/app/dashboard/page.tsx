"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/firabase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import { VisitorChart } from '@/components/VisitorChart';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [visitorData, setVisitorData] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("1. useEffectが開始されました。Firestoreの監視を開始します。");
    const q = query(collection(db, "visitors"), orderBy("__name__")); // __name__ はドキュメントID(日付)

    // onSnapshotでリアルタイムの変更を監視
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: Record<string, number> = {};
      querySnapshot.forEach((doc) => {
        console.log(`   - ドキュメントID: ${doc.id}, データ:`, doc.data());
        data[doc.id] = doc.data().count;
      });
      setVisitorData(data);
      setIsLoading(false);
    });

    // コンポーネントがアンマウントされた時に監視を解除
    return () => unsubscribe();
  }, []);
  
  const router = useRouter();
  const addVisitorData = () => router.push('/dashboard/add');

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl font-bold mt-16 mb-6">店舗ダッシュボード</h1>
      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold mb-4">来店人数グラフ</h2>
        <div className="relative h-[50vh] w-full p-4 bg-white shadow-lg rounded-lg overflow-x-auto">
          {isLoading ? (
            <p>データを読み込み中...</p>  
          ) : Object.keys(visitorData).length > 0 ? (
            <VisitorChart visitorData={visitorData} />
          ) : (
            <p>表示するデータがありません。データを入力してください。</p>
          )}
        </div>
      </div>
      <button onClick={ addVisitorData } className="w-full mt-4 text-center bg-gray-900 text-white rounded px-4 py-2 hover:cursor-pointer hover:shadow-lg">データを追加/更新</button>
    </main>
  );
}