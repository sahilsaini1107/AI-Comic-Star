import React, { useRef, useEffect, useState } from 'react';
import heroImage from '../../assets/4833725.jpg';

const HeroCanvas = ({ images }) => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not supported');
      return;
    }

    const drawImages = () => {
      const width = window.innerWidth; // Set canvas width based on a fraction of window width
      const height = window.innerHeight; // Set canvas height based on a fraction of window height

      canvas.width = width;
      canvas.height = height;

      const gapX = 15; // gap between columns
      const gapY = 15; // gap between rows

      const columns = isMobile ? 3 : 4;
      const rows = isMobile ? 4 : 3;

      const cellWidth = ((width - (gapX * 3)) / columns) -30; // Adjusting for gaps
      const cellHeight = ((height - (gapY * 2)) / rows)-15; // Adjusting for gaps
    

      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
        images.forEach((url, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;

          const img = new Image();
          img.onload = () => {

            const imageX = col * (cellWidth + gapX) + 60; 
            const imageY = row * (cellHeight + gapY) + 20;

            // ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, imageX, imageY, cellWidth, cellHeight);
            ctx.strokeStyle = '#79451D';
            ctx.lineWidth = 4;
            ctx.strokeRect(imageX, imageY, cellWidth, cellHeight);

            // Other drawing operations (circles, text, etc.)
            ctx.font = '16px Arial';
            // Replace url.anno with a string or the appropriate property from the images object
            const text = url.anno; // Replace with the desired text
            const maxChars = 9;
             // Truncate text if it exceeds the maximum character count
            const truncatedText = text.length > maxChars ? `${text.substring(0, maxChars)}...` : text;

            const textWidth = ctx.measureText(text).width;
            const fontSize = Math.min(10, 5+(Math.min(cellWidth+10, cellHeight+10) / ((textWidth) ? textWidth/2: 1)));

            const circle1X = imageX + 35;
            const circle1Y = imageY + 35;
            ctx.beginPath();
            ctx.arc(circle1X, circle1Y, fontSize+15, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'orange';
            ctx.lineWidth = 2;
            ctx.stroke();

            const circle2X = imageX + 65;
            const circle2Y = imageY + 60;
            ctx.beginPath();
            ctx.arc(circle2X, circle2Y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'orange';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillText(truncatedText, circle1X, circle1Y); // Replace url.anno with the desired text variable
          };
          img.onerror = (error) => {
            console.error('Error loading image:', error);
          };
          img.src = url.url;
        });
      };
      image.src = heroImage;
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkIsMobile();
        drawImages();
      }, 250); // Adjust the delay time (in milliseconds) as needed
    };

    window.addEventListener('resize',handleResize);

    checkIsMobile();
    drawImages();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [images, isMobile]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    const link = document.createElement('a');
    link.download = 'comic_page.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas ref={canvasRef} />
      <button
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={downloadCanvas}
      >
        Download Comic
      </button>
    </div>
  );
};

export default HeroCanvas;
