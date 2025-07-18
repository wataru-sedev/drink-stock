'use client';

import { Drink, Drinks } from "@/lib/drinkData";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { db } from "@/lib/firebase/drink";
import { writeBatch, doc } from "firebase/firestore";

const LOCAL_STORAGE_KEY = 'drinkMemos';

export default function Home() {
  const [drinkStocks, setDrinkStocks] = useState<Drink[]>([]);

  useEffect(() => {
    const storedMemos = localStorage.getItem(LOCAL_STORAGE_KEY);
    const memos = storedMemos ? JSON.parse(storedMemos) : {};

    const initialStocks = Drinks.map(drink => ({
      ...drink,
      memo: memos[drink.name] || '', 
      quantity: undefined,
    }));
    setDrinkStocks(initialStocks);
  }, []);

  useEffect(() => {
    if (drinkStocks.length === 0) return;
    
    const memosToStore = drinkStocks.reduce((acc, drink) => {
      if (drink.memo) { 
        acc[drink.name] = drink.memo;
      }
      return acc;
    }, {} as { [key: string]: string });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memosToStore));
  }, [drinkStocks]);

  const onChangeMemo = (index: number, value: string) => {
    const newDrinkStocks = [...drinkStocks];
    newDrinkStocks[index].memo = value;
    setDrinkStocks(newDrinkStocks);
  };

  const onChangeQuantity = (index: number, value: string) => {
    const newDrinkStocks = [...drinkStocks];
    newDrinkStocks[index].quantity = value === '' ? undefined : parseInt(value, 10);
    setDrinkStocks(newDrinkStocks);
  }

  const handleSetOverstock = (index: number) => {
    const newDrinkStocks = [...drinkStocks];
    newDrinkStocks[index].quantity = 100; 
    setDrinkStocks(newDrinkStocks);
  };

  const onClickComplete = async() => {
    const hasEmptyField = drinkStocks.some((drink) => {
            if (drink.quantity === undefined ) {
              toast.error("入力されていない項目があります。");
              return true;
            }
            return false;
          });
    if (hasEmptyField) return;
    try {
      const batch = writeBatch(db);
      drinkStocks.forEach((drink) => {
        const { name, quantity } = drink;
        const docRef = doc(db, "inventory", name);
        batch.update(docRef, { quantity: quantity });
      });
      await batch.commit();
      toast.success('在庫データを更新しました');
      setDrinkStocks(drinkStocks.map(drink => ({ ...drink,memo:'', quantity: undefined })));
    } catch (error) {
      console.error("更新エラー:", error);
    }
  }

  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg m-2 mt-16">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 bg-gray-100">
            <tr>
              <th scope="col" className="px-3 py-3 sm:px-6">ドリンク名</th>
              <th scope="col" className="px-3 py-3 sm:px-6">メモ</th>
              <th scope="col" className="px-1 py-3 sm:px-6">定数</th>
              <th scope="col" className="px-4 py-3 sm:px-6">在庫数</th>
            </tr>
          </thead>
          <tbody>
            {drinkStocks.map((drink, index) => {
              const { name, japaneseName, required, memo, quantity } = drink;
              return (
                <tr key={name} className="bg-white border-b hover:bg-gray-50">
                  <td
                    scope="row"
                    className="px-3 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {japaneseName}
                  </td>
                  <td className="px-3 py-2 sm:px-6">
                    <input
                      type="number"
                      value={memo || ''}
                      onChange={(e) => onChangeMemo(index, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                    />
                  </td>
                      <td className="px-1 py-4 sm:px-6">
                        {required}
                      </td>
                      <td className="px-4 py-2 sm:px-6">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={quantity === undefined ? '' : quantity}
                            onChange={(e) => onChangeQuantity(index, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                          />
                          <button
                            onClick={() => handleSetOverstock(index)}
                            className="p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700"
                            title="在庫十分"
                          >
                            ✓
                          </button>
                        </div>
                      </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={ onClickComplete } className="w-full mt-4 text-center bg-gray-900 text-white rounded px-4 py-2 hover:cursor-pointer hover:shadow-lg">入力完了</button>
        <a className="block w-full mt-4 mb-8 text-center bg-white text-gray-900 rounded px-4 py-2 border border-gray-800 hover:cursor-pointer hover:shadow-lg" target="_blank" rel="noopener noreferrer" href="https://script.google.com/macros/s/AKfycbyh9Htl13kFOACok61A4uk1_D4mHUndAo-6aEGGGfFYIBqOyIMRy1-EOuqzJBjCtU2T/exec">店長に送信</a>
      </div>
    </div>
  );
}

