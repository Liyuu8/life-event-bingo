'use client';

import Link from 'next/link';
import { BingoCard } from '@/types/bingo';

interface BingoListProps {
  bingos: BingoCard[];
}

const categoryColors = {
  work: 'bg-blue-100 text-blue-800',
  love: 'bg-pink-100 text-pink-800',
  family: 'bg-green-100 text-green-800',
  health: 'bg-red-100 text-red-800',
  hobby: 'bg-purple-100 text-purple-800',
  travel: 'bg-yellow-100 text-yellow-800',
  achievement: 'bg-orange-100 text-orange-800',
  misc: 'bg-gray-100 text-gray-800',
};

export default function BingoList({ bingos }: BingoListProps) {
  const getCategoryCount = (bingo: BingoCard) => {
    const counts = bingo.events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ライフイベントビンゴ</h1>
        <p className="text-gray-600 text-lg">
          人生の出来事でビンゴを楽しもう！あなたの経験をチェックして、ビンゴを目指しましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bingos.map((bingo) => (
          <div
            key={bingo.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{bingo.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{bingo.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {getCategoryCount(bingo).map(([category, count]) => (
                <span
                  key={category}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[category as keyof typeof categoryColors]
                  }`}
                >
                  {category} {count}
                </span>
              ))}
            </div>

            <div className="text-xs text-gray-500 mb-4">
              作成日: {new Date(bingo.createdAt).toLocaleDateString('ja-JP')}
            </div>

            <Link
              href={`/bingo/${bingo.id}`}
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-200"
            >
              ビンゴを始める
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}