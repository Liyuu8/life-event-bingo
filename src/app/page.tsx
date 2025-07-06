import Link from 'next/link';
import { allBingos } from '@/data/sample-bingos';
import { BingoCard } from '@/types/bingo';

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

const getCategoryCount = (bingo: BingoCard) => {
  const counts = bingo.events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ライフイベントビンゴ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            人生の出来事でビンゴを楽しもう！<br />
            あなたの経験をチェックして、ビンゴを目指しましょう。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">遊び方</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
              <p className="font-medium">好きなビンゴカードを選択</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
              <p className="font-medium">経験した出来事をクリック</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
              <p className="font-medium">一列揃えばビンゴ完成！</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">ビンゴを選択してください</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBingos.map((bingo) => (
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

        <div className="mt-12 text-center text-gray-500">
          友達や家族と一緒に楽しんでみてください！
        </div>
      </div>
    </div>
  );
}
