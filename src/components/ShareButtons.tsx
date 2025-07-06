'use client';

import { useState, RefObject } from 'react';
import { BingoCard } from '@/types/bingo';
import {
  generateBingoShareText,
  getShareUrl,
  shareToTwitter,
  shareToFacebook,
  shareToLine,
  shareWithWebAPI,
  copyToClipboard,
  ShareData
} from '@/utils/shareUtils';
import { generateBingoImage, downloadImage, shareImageFile } from '@/utils/imageUtils';

interface ShareButtonsProps {
  bingo: BingoCard;
  completedCount: number;
  bingoCardRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function ShareButtons({ bingo, completedCount, bingoCardRef, className = '' }: ShareButtonsProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const shareData: ShareData = {
    title: `${bingo.title} - ライフイベントビンゴ`,
    text: generateBingoShareText(bingo, completedCount),
    url: getShareUrl(),
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGenerateImage = async (): Promise<string | null> => {
    if (!bingoCardRef?.current) {
      showToastMessage('ビンゴカードが見つかりません');
      return null;
    }

    setIsGeneratingImage(true);
    try {
      const imageDataUrl = await generateBingoImage(bingoCardRef.current);
      if (!imageDataUrl) {
        showToastMessage('画像の生成に失敗しました');
        return null;
      }
      return imageDataUrl;
    } catch {
      showToastMessage('画像の生成中にエラーが発生しました');
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDownloadImage = async () => {
    const imageDataUrl = await handleGenerateImage();
    if (imageDataUrl) {
      const filename = `${bingo.title.replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '_')}_bingo.png`;
      downloadImage(imageDataUrl, filename);
      showToastMessage('画像をダウンロードしました！');
    }
  };

  const handleWebShare = async () => {
    if (bingoCardRef?.current) {
      const imageDataUrl = await handleGenerateImage();
      if (imageDataUrl) {
        const filename = `${bingo.title}_bingo.png`;
        const success = await shareImageFile(imageDataUrl, filename, shareData.title, shareData.text);
        if (success) {
          return;
        }
      }
    }
    
    const success = await shareWithWebAPI(shareData);
    if (!success) {
      showToastMessage('この機能はお使いのブラウザでサポートされていません');
    }
  };

  const handleCopyLink = async () => {
    const shareText = `${shareData.text}\n\n${shareData.url}`;
    const success = await copyToClipboard(shareText);
    if (success) {
      showToastMessage('クリップボードにコピーしました！');
    } else {
      showToastMessage('コピーに失敗しました');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 text-center">結果を共有する</h3>
        
        {/* Image Download Button */}
        {bingoCardRef && (
          <button
            onClick={handleDownloadImage}
            disabled={isGeneratingImage}
            className="flex items-center justify-center space-x-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">
              {isGeneratingImage ? '生成中...' : '画像をダウンロード'}
            </span>
          </button>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {/* Twitter */}
          <button
            onClick={() => shareToTwitter(shareData)}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <span className="text-sm font-medium">Twitter</span>
          </button>

          {/* Facebook */}
          <button
            onClick={() => shareToFacebook(shareData)}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </button>

          {/* LINE */}
          <button
            onClick={() => shareToLine(shareData)}
            className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            <span className="text-sm font-medium">LINE</span>
          </button>

          {/* Web Share API */}
          <button
            onClick={handleWebShare}
            className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-sm font-medium">その他</span>
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">リンクをコピー</span>
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}