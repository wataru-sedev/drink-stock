'use client';

import { Drinks } from "@/lib/drinkData";
import { useState } from "react";

export default function Home() {
  const onChangeMemo = (index: number, value: string) => alert('memo changed');
  const onChangeQuantity = (index: number, value: string) => alert('quantity changed');

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">ドリンク名</th>
              <th scope="col" className="px-4 py-3 sm:px-6">メモ</th>
              <th scope="col" className="px-4 py-3 sm:px-6">定数</th>
              <th scope="col" className="px-4 py-3 sm:px-6">在庫数</th>
            </tr>
          </thead>
          <tbody>
            {Drinks.map((drink, index) => {
              const { name, japaneseName, required } = drink;
              return (
                <tr key={name} className="bg-white border-b hover:bg-gray-50">
                  <td
                    scope="row"
                    className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {japaneseName}
                  </td>
                  <td className="px-4 py-2 sm:px-6">
                    <input
                      type="number"
                      value={''}
                      onChange={(e) => onChangeMemo(index, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                    />
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {required}
                  </td>
                  <td className="px-4 py-2 sm:px-6">
                    <input
                      type="number"
                      value={''}
                      onChange={(e) => onChangeQuantity(index, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

