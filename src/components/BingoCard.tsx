'use client';

import { useState, useRef } from 'react';
import { BingoCard as BingoCardType, UserProgress } from '@/types/bingo';
import BingoCell from './BingoCell';
import ShareButtons from './ShareButtons';
import BingoImageCard from './BingoImageCard';

interface BingoCardProps {
  bingo: BingoCardType;
  userProgress?: UserProgress;
  onCellClick?: (eventId: string) => void;
}

export default function BingoCard({ bingo, userProgress, onCellClick }: BingoCardProps) {
  const [completedEvents, setCompletedEvents] = useState<string[]>(
    userProgress?.completedEvents || []
  );
  const bingoCardRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  const handleCellClick = (eventId: string) => {
    const newCompletedEvents = completedEvents.includes(eventId)
      ? completedEvents.filter(id => id !== eventId)
      : [...completedEvents, eventId];
    
    setCompletedEvents(newCompletedEvents);
    onCellClick?.(eventId);
  };

  const isBingo = () => {
    const grid = Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => {
        const index = row * 5 + col;
        return completedEvents.includes(bingo.events[index]?.id);
      })
    );

    // Check rows
    for (let row = 0; row < 5; row++) {
      if (grid[row].every(cell => cell)) return true;
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      if (grid.every(row => row[col])) return true;
    }

    // Check diagonals
    if (grid.every((row, index) => row[index])) return true;
    if (grid.every((row, index) => row[4 - index])) return true;

    return false;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{bingo.title}</h1>
        <p className="text-gray-600">{bingo.description}</p>
        {isBingo() && (
          <div className="mt-4 p-6 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
            <p className="text-xl font-bold text-yellow-800 mb-4">🎉 ビンゴ！おめでとうございます！ 🎉</p>
            <ShareButtons bingo={bingo} completedCount={completedEvents.length} bingoCardRef={imageCardRef} />
          </div>
        )}
      </div>
      
      <div ref={bingoCardRef} className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">{bingo.title}</h2>
          <p className="text-sm text-gray-600">{bingo.description}</p>
        </div>
        
        <div className="grid grid-cols-5 gap-2 mb-4">
          {bingo.events.slice(0, 25).map((event) => (
            <BingoCell
              key={event.id}
              event={event}
              isCompleted={completedEvents.includes(event.id)}
              onClick={() => handleCellClick(event.id)}
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          完了した項目: {completedEvents.length} / 25
        </div>
      </div>

      {/* 進行中でも共有可能 */}
      {!isBingo() && completedEvents.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <ShareButtons bingo={bingo} completedCount={completedEvents.length} bingoCardRef={imageCardRef} />
        </div>
      )}
      
      {/* Hidden image card for screenshot */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <BingoImageCard 
          ref={imageCardRef}
          bingo={bingo} 
          completedEvents={completedEvents} 
        />
      </div>
    </div>
  );
}