import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ライフイベントビンゴ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            人生の出来事でビンゴを楽しもう！<br />
            あなたの経験をチェックして、ビンゴを目指しましょう。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">遊び方</h2>
          <div className="text-left space-y-3 text-gray-600">
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
              <p>好きなビンゴカードを選択します</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
              <p>経験した出来事のマスをクリックしてチェックします</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
              <p>縦・横・斜めのいずれかで一列揃えばビンゴ完成！</p>
            </div>
          </div>
        </div>

        <Link
          href="/bingo"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          ビンゴを始める
        </Link>

        <div className="mt-8 text-sm text-gray-500">
          友達や家族と一緒に楽しんでみてください！
        </div>
      </div>
    </div>
  );
}
