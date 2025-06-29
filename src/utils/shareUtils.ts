import { BingoCard } from '@/types/bingo';

export interface ShareData {
  title: string;
  text: string;
  url: string;
  hashtags?: string[];
}

export function generateBingoShareText(bingo: BingoCard, completedCount: number): string {
  const completionRate = Math.round((completedCount / 25) * 100);
  
  return `🎉 「${bingo.title}」でビンゴ完成！\n\n` +
         `完了した項目: ${completedCount}/25 (${completionRate}%)\n` +
         `人生の出来事をチェックしながらビンゴを楽しもう！\n\n` +
         `#ライフイベントビンゴ #人生ビンゴ #${bingo.title.replace(/ビンゴ$/, '')}`;
}

export function getShareUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://life-event-bingo.vercel.app';
}

export function shareToTwitter(shareData: ShareData): void {
  const baseUrl = 'https://twitter.com/intent/tweet';
  const params = new URLSearchParams({
    text: shareData.text,
    url: shareData.url,
  });
  
  if (shareData.hashtags && shareData.hashtags.length > 0) {
    params.append('hashtags', shareData.hashtags.join(','));
  }
  
  const url = `${baseUrl}?${params.toString()}`;
  window.open(url, '_blank', 'width=550,height=420');
}

export function shareToFacebook(shareData: ShareData): void {
  const baseUrl = 'https://www.facebook.com/sharer/sharer.php';
  const params = new URLSearchParams({
    u: shareData.url,
    quote: shareData.text,
  });
  
  const url = `${baseUrl}?${params.toString()}`;
  window.open(url, '_blank', 'width=550,height=420');
}

export function shareToLine(shareData: ShareData): void {
  const baseUrl = 'https://social-plugins.line.me/lineit/share';
  const params = new URLSearchParams({
    url: shareData.url,
    text: shareData.text,
  });
  
  const url = `${baseUrl}?${params.toString()}`;
  window.open(url, '_blank', 'width=550,height=420');
}

export async function shareWithWebAPI(shareData: ShareData): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url,
      });
      return true;
    } catch (error) {
      console.log('Web Share API failed:', error);
      return false;
    }
  }
  return false;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => false);
  }
  
  // Fallback for older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve(successful);
  } catch {
    return Promise.resolve(false);
  }
}