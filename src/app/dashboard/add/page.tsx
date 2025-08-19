"use client";

import { useState } from 'react';
import { db } from '@/lib/firebase/firabase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DataInputForm () {
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !count) {
      setMessage('日付と人数を入力してください。');
      return;
    }

    const visitorCount = parseInt(count, 10);

    try {
      // Firestoreの'visitors'コレクションにデータを保存
      // ドキュメントIDを日付にすることで、同じ日のデータは上書きされる
      await setDoc(doc(db, 'visitors', date), {
        count: visitorCount,
      });
      
      setMessage(`${date}のデータを追加/更新しました。`);
      // 入力フォームをクリア
      setDate('');
      setCount('');

      router.push('/dashboard'); 

    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage('データの追加に失敗しました。');
    }
  };

  const router = useRouter();

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg mt-16 mb-6 ">
      <h2 className="text-xl font-semibold mb-4">データ入力</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            日付
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-gray-700">
            来店者数
          </label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          追加/更新
        </button>
        <Link href="/dashboard" className="block w-full mt-4 mb-8 text-center bg-white text-gray-900 rounded px-4 py-2 border border-gray-800 hover:cursor-pointer hover:shadow-lg">戻る</Link>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};