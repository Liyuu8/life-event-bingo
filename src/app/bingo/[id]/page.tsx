import { notFound } from 'next/navigation';
import BingoCard from '@/components/BingoCard';
import { allBingos } from '@/data/sample-bingos';
import Link from 'next/link';

interface BingoPageProps {
  params: Promise<{ id: string }>;
}

export default async function BingoPage({ params }: BingoPageProps) {
  const { id } = await params;
  const bingo = allBingos.find(b => b.id === id);

  if (!bingo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← ホームに戻る
          </Link>
        </div>
        
        <BingoCard bingo={bingo} />
      </div>
    </div>
  );
}