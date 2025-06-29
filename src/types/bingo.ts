export interface LifeEvent {
  id: string;
  text: string;
  category: 'work' | 'love' | 'family' | 'health' | 'hobby' | 'travel' | 'achievement' | 'misc';
}

export interface BingoCard {
  id: string;
  title: string;
  description: string;
  events: LifeEvent[];
  createdAt: string;
}

export interface UserProgress {
  bingoId: string;
  completedEvents: string[];
  completedAt?: string;
}