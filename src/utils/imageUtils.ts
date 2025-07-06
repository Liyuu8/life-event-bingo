import html2canvas from 'html2canvas';

export const generateBingoImage = async (element: HTMLElement): Promise<string | null> => {
  try {
    // Wait a bit for any animations or layout changes to complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      logging: true, // Enable logging for debugging
      scale: 1, // Start with scale 1 to avoid issues
      backgroundColor: '#ffffff',
      foreignObjectRendering: false, // Disable foreign object rendering
      imageTimeout: 15000, // Increase timeout
      removeContainer: true,
    });
    
    return canvas.toDataURL('image/png', 0.95);
  } catch (error) {
    console.error('Failed to generate image:', error);
    console.error('Element details:', {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
    });
    return null;
  }
};

export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const shareImageFile = async (dataUrl: string, filename: string, title: string, text: string): Promise<boolean> => {
  if (!navigator.share) {
    return false;
  }

  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title,
        text,
        files: [file],
      });
      return true;
    }
  } catch (error) {
    console.error('Failed to share image:', error);
  }
  
  return false;
};