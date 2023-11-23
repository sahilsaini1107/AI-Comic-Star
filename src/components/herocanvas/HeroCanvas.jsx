import React, { useRef, useEffect } from 'react';
import heroImage from '../../assets/4833725.jpg';

const HeroCanvas = ({ images }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
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

      // const cellWidth = width / 4;
      // const cellHeight = height / 3;
      const cellWidth = ((width - (gapX * 3)) / 4) -30; // Adjusting for gaps
      const cellHeight = ((height - (gapY * 2)) / 3)-15; // Adjusting for gaps
    

      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
        images.forEach((url, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;

          const img = new Image();
          img.onload = () => {
            // const imageX = col * cellWidth + 40;
            // const imageY = row * cellHeight + 20 ;
            const imageX = col * (cellWidth + gapX) + 60; 
            const imageY = row * (cellHeight + gapY) + 20;

            // ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, imageX, imageY, cellWidth, cellHeight);
            ctx.strokeStyle = 'aqua';
            ctx.lineWidth = 8;
            ctx.strokeRect(imageX, imageY, cellWidth, cellHeight);

            // Other drawing operations (circles, text, etc.)
            ctx.font = '16px Arial';
            // Replace url.anno with a string or the appropriate property from the images object
            const text = 'Sample Text'; // Replace with the desired text
            const textWidth = ctx.measureText(text).width;
            const fontSize = Math.min(16, Math.min(cellWidth, cellHeight) / (textWidth || 1));

            const circle1X = imageX + 27;
            const circle1Y = imageY + 27;
            ctx.beginPath();
            ctx.arc(circle1X, circle1Y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'aqua';
            ctx.lineWidth = 2;
            ctx.stroke();

            const circle2X = imageX + 55;
            const circle2Y = imageY + 45;
            ctx.beginPath();
            ctx.arc(circle2X, circle2Y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = 'aqua';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillText(text, circle1X, circle1Y); // Replace url.anno with the desired text variable
          };
          img.onerror = (error) => {
            console.error('Error loading image:', error);
          };
          img.src = url.url;
        });
      };
      image.src = heroImage;
    };

    window.addEventListener('resize', drawImages);
    drawImages();

    return () => {
      window.removeEventListener('resize', drawImages);
    };
  }, [images]);

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
