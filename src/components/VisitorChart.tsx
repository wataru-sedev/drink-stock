"use client"; 

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

// propsの型定義
interface VisitorChartProps {
  visitorData: Record<string, number>;
}

export const VisitorChart = ({ visitorData }: VisitorChartProps) => {
  const labels = Object.keys(visitorData).map(dateStr => dateStr.replace(/-/g, '/'));
  const counts = Object.values(visitorData);

  const data = {
    labels,
    datasets: [
      {
        label: '来店人数',
        data: counts,
        borderColor: 'rgb(54, 162, 235)', 
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.1, 
      },
    ],
  };

  const options = {
    responsive: true, 
    maintainAspectRatio: false, // アスペクト比を維持しない
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '日別 来店人数推移',
      },
      datalabels: {
        anchor: 'end',      
        align: 'top',       
        offset: 1,          
        color: '#333',      
        font: {
          weight: 'bold',   
          size: 9, 
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        ticks: {
          callback: function(value: any, index: number, ticks: any): string {
            // `value`はlabels配列のインデックスです。
            // `this`を使わず、直接`labels`配列から現在のラベルを取得します。
            const currentLabel = labels[value as number];

            // データのラベルが存在しない場合は空文字を返す (安全対策)
            if (!currentLabel) {
                return '';
            }
            
            // 最初のラベルは年を省略しない
            if (index === 0) {
                return currentLabel;
            }

            // 1つ前のティック（目盛り）のインデックスを取得
            const previousTickValue = ticks[index - 1].value;
            const previousLabel = labels[previousTickValue as number];

            // 年が変わっていれば年を表示、変わっていなければ月日のみ表示
            if (previousLabel && currentLabel.substring(0, 4) !== previousLabel.substring(0, 4)) {
                return currentLabel; // "YYYY/MM/DD"
            } else {
                return currentLabel.substring(5); // "MM/DD"
            }
          }
        }
      }
    }
  } as const;

  // 1画面に表示したいデータ数。この数値を変更すれば密度を調整できます。
  const VISIBLE_DATA_COUNT = 20;

  // 基準とする画面幅（ピクセル単位）。一般的なスマートフォンの幅を想定しています。
  const BASE_SCREEN_WIDTH = 390; 

  // 「1データあたりの幅」を計算
  const pixelsPerEntry = BASE_SCREEN_WIDTH / VISIBLE_DATA_COUNT;
  
  // 「グラフ全体の幅」を計算（1データあたりの幅 × 総データ数）
  const totalDataCount = labels.length;
  
  const minWidth =  totalDataCount * pixelsPerEntry;
  
  return (
      <div style={{ minWidth: `${minWidth}px`, height: '100%' }}>
        <Line options={options} data={data} />
      </div>
    );
};