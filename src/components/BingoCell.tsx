'use client';

import { LifeEvent } from '@/types/bingo';

interface BingoCellProps {
  event: LifeEvent;
  isCompleted: boolean;
  onClick: () => void;
}

const categoryColors = {
  work: 'bg-blue-100 border-blue-300 text-blue-800',
  love: 'bg-pink-100 border-pink-300 text-pink-800',
  family: 'bg-green-100 border-green-300 text-green-800',
  health: 'bg-red-100 border-red-300 text-red-800',
  hobby: 'bg-purple-100 border-purple-300 text-purple-800',
  travel: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  achievement: 'bg-orange-100 border-orange-300 text-orange-800',
  misc: 'bg-gray-100 border-gray-300 text-gray-800',
};

const completedColors = {
  work: 'bg-blue-500 border-blue-600 text-white',
  love: 'bg-pink-500 border-pink-600 text-white',
  family: 'bg-green-500 border-green-600 text-white',
  health: 'bg-red-500 border-red-600 text-white',
  hobby: 'bg-purple-500 border-purple-600 text-white',
  travel: 'bg-yellow-500 border-yellow-600 text-white',
  achievement: 'bg-orange-500 border-orange-600 text-white',
  misc: 'bg-gray-500 border-gray-600 text-white',
};

export default function BingoCell({ event, isCompleted, onClick }: BingoCellProps) {
  const colorClass = isCompleted
    ? completedColors[event.category]
    : categoryColors[event.category];

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square p-2 rounded-lg border-2 text-xs font-medium
        transition-all duration-200 hover:scale-105 hover:shadow-md
        ${colorClass}
        ${isCompleted ? 'shadow-lg' : 'hover:shadow-md'}
      `}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-center leading-tight">{event.text}</span>
        {isCompleted && (
          <span className="text-lg mt-1">✓</span>
        )}
      </div>
    </button>
  );
}