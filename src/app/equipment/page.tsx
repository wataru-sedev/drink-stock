'use client';

import { useState, useEffect } from "react"
import { writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/equipment";
import { Equipment, Equipments } from "@/lib/equipmentData";
import { toast } from "sonner";

export default function Equipmentpage(){
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        const initialEquipments = Equipments.map(item => ({
            ...item,
            quantity: undefined, 
        }));
        setEquipments(initialEquipments);
    }, []);
    
    const onChangeQuantity =(index:number, value:string)=>{
      const newEquipments = [...equipments];
      equipments[index].quantity = parseInt(value); 
      setEquipments(newEquipments);
    }

    const handleSetOverstock = (index: number) => {
    const newEquipments = [...equipments];
    newEquipments[index].quantity = 100; 
    setEquipments(newEquipments);
  };

    const onClickQuantityComplete = async () => {
        const hasEmptyField = equipments.some((item) => {
            if (item.quantity === undefined) {
              toast.error("入力されていない項目があります。");
              return true;
            }
            return false;
          });
        if (hasEmptyField) return;
        try {
            const batch = writeBatch(db);
            equipments.forEach((item) => {
              const docRef = doc(db, "equipment", item.name);
              batch.update(docRef, { quantity: item.quantity });
            });
            await batch.commit();
        
            toast.success('在庫データを更新しました');
            setEquipments(equipments.map(item => ({ ...item, quantity: undefined })));
          } catch (error) {
            console.error("更新エラー:", error);
        }
    };
    
    return(
      <div>
        <div className="relative overflow-x-auto sm:rounded-lg m-2 mt-16">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 bg-gray-100">
            <tr>
              <th scope="col" className="px-5 py-3 sm:px-6">備品名</th>
              <th scope="col" className="px-3 py-3 sm:px-6">定数</th>
              <th scope="col" className="px-3 py-3 sm:px-6">在庫数</th>
            </tr>
            </thead>
            <tbody>
              {equipments.map((item, index)=>{
                  const {japaneseName, required, quantity} = item;
                  return(
                      <tr key={ japaneseName } className="bg-white border-b hover:bg-gray-50">
                          <td className="px-5 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap">{ japaneseName }</td>
                          <td className="px-1 py-4 sm:px-6">{ required }</td>
                          <td className="px-4 py-2 sm:px-6">
                            <div className="flex items-center gap-2">
                              <input 
                                type="number"
                                value={ quantity === undefined ? '' : quantity }
                                onChange={(e) => onChangeQuantity(index, e.target.value)}
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                              />
                              <button onClick={() => handleSetOverstock(index)} className="p-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700" title="在庫十分">
                                ✓
                              </button>
                            </div>
                          </td>
                      </tr>
                  )
              })}
            </tbody>
          </table>
          <button onClick={ onClickQuantityComplete } className="w-full mt-4 text-center bg-gray-900 text-white rounded px-4 py-2 hover:cursor-pointer hover:shadow-lg">入力完了</button>
          <a className="block w-full mt-4 mb-8 text-center bg-white text-gray-900 rounded px-4 py-2 border border-gray-800 hover:cursor-pointer hover:shadow-lg" target="_blank" rel="noopener noreferrer" href="https://script.google.com/macros/s/AKfycbyh9Htl13kFOACok61A4uk1_D4mHUndAo-6aEGGGfFYIBqOyIMRy1-EOuqzJBjCtU2T/exec">店長に送信</a>
        </div>
      </div>
    )
}   