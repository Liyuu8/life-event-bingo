import BingoList from '@/components/BingoList';
import { allBingos } from '@/data/sample-bingos';

export default function BingoListPage() {
  return <BingoList bingos={allBingos} />;
}