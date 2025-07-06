'use client';

import { BingoCard as BingoCardType } from '@/types/bingo';
import { forwardRef } from 'react';

interface BingoImageCardProps {
  bingo: BingoCardType;
  completedEvents: string[];
}

const categoryColors = {
  work: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  love: { bg: '#fce7f3', border: '#ec4899', text: '#be185d' },
  family: { bg: '#dcfce7', border: '#22c55e', text: '#15803d' },
  health: { bg: '#fee2e2', border: '#ef4444', text: '#dc2626' },
  hobby: { bg: '#ede9fe', border: '#8b5cf6', text: '#7c3aed' },
  travel: { bg: '#fef3c7', border: '#f59e0b', text: '#d97706' },
  achievement: { bg: '#fed7aa', border: '#f97316', text: '#ea580c' },
  misc: { bg: '#f3f4f6', border: '#6b7280', text: '#374151' },
};

const BingoImageCard = forwardRef<HTMLDivElement, BingoImageCardProps>(
  ({ bingo, completedEvents }, ref) => {
    return (
      <div 
        ref={ref} 
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            margin: '0 0 8px 0' 
          }}>
            {bingo.title}
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280', 
            margin: '0' 
          }}>
            {bingo.description}
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {bingo.events.slice(0, 25).map((event) => {
            const isCompleted = completedEvents.includes(event.id);
            const colors = categoryColors[event.category];
            
            return (
              <div
                key={event.id}
                style={{
                  aspectRatio: '1',
                  padding: '8px',
                  borderRadius: '6px',
                  border: `2px solid ${colors.border}`,
                  backgroundColor: isCompleted ? colors.border : colors.bg,
                  color: isCompleted ? '#ffffff' : colors.text,
                  fontSize: '11px',
                  fontWeight: '500',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  position: 'relative'
                }}
              >
                <span>{event.text}</span>
                {isCompleted && (
                  <span style={{ 
                    fontSize: '16px', 
                    marginTop: '4px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: '#6b7280' 
        }}>
          完了した項目: {completedEvents.length} / 25
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#9ca3af',
          marginTop: '16px',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '12px'
        }}>
          ライフイベントビンゴ
        </div>
      </div>
    );
  }
);

BingoImageCard.displayName = 'BingoImageCard';

export default BingoImageCard;