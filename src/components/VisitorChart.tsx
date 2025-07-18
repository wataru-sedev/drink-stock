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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// propsの型定義
interface VisitorChartProps {
  visitorData: Record<string, number>;
}

export const VisitorChart = ({ visitorData }: VisitorChartProps) => {
  // データをChart.jsが要求する形式に変換
  const labels = Object.keys(visitorData).map(dateStr => dateStr.replace(/-/g, '/'));
  const counts = Object.values(visitorData);

  const data = {
    labels,
    datasets: [
      {
        label: '来店人数',
        data: counts,
        borderColor: 'rgb(54, 162, 235)', // 線の色
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // 線の下の塗りつぶし色
        tension: 0.1, // 線の滑らかさ
      },
    ],
  };

  const options = {
    responsive: true, // レスポンシブ対応
    maintainAspectRatio: false, // アスペクト比を維持しない
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '日別 来店人数推移',
      },
    },
    scales: {
        y: {
            beginAtZero: true // Y軸の開始を0からにする
        }
    }
  };

  return <Line options={options} data={data} />;
};