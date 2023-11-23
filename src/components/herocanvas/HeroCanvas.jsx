import React, { useRef, useEffect} from 'react';
import Styles from './HeroCanvas.module.css';
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

      const gap = 10; // Adjust the gap between images
      const imageWidth = 300; // Adjust the image width

      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);

        // Calculate total images width including gaps
        const totalImagesWidth = (images.length - 1) * gap + images.length * imageWidth;

        // Starting X position to center the images horizontally
        let startX = (width - totalImagesWidth) / 2;
        const startY = height * 0.1; // Set a fixed starting Y position

        images.forEach((url, index) => {
          const img = new Image();
          img.onload = () => {
            const rect = image.getBoundingClientRect();
            let imageX;
            let imageY;
            if(index==0){
              imageX = 50;
              imageY = 30;
            }else if(index<4){
              imageX = (100) * (index*3.5);
              imageY = 30;
            }else if(index === 4){ 
              imageX = 50;
              imageY = 360;
            }else if(index<8){
              let x = index-4;
              imageX = 100 * (x*3.5);
              imageY = 360;
            }else if(index === 8){
              imageX = 50;
              imageY = 690;
            }else{
              let x = index-8;
              imageX = 100 * (x*3.5);
              imageY = 360;
            }

            ctx.filter = 'grayscale(100%)';
            ctx.drawImage(img, imageX, imageY, imageWidth, 300); // Scale height based on canvas height
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.strokeRect(imageX, imageY, imageWidth, 300);

            // Other drawing operations (circles, text, etc.)
            ctx.font = '16px Arial';
            const textWidth = ctx.measureText(url.anno).width;
            const fontSize = Math.min(16, 200 / (textWidth || 1));

            const circle1Radius = (textWidth > 20) ? (textWidth + 10) / 2 : 20;
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
            ctx.fillText(url.anno, circle1X, circle1Y);
            // Update start X position for the next image
            startX += imageWidth + gap;
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

  // Rest of the component remains the same

  return (
    <div>
      <canvas ref={canvasRef} />
      {/* ... */}
    </div>
  );
};

export default HeroCanvas;



// const HeroCanvas = ({ images }) => {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       console.error('Canvas element not found');
//       return;
//     }
//     const ctx = canvas.getContext('2d');
//     if (!ctx) {
//       console.error('Canvas context not supported');
//       return;
//     }

//     canvas.width = window.innerWidth; // Set canvas width based on window width
//     canvas.height = window.innerHeight;

//     images.forEach((url, index) => {
//       const img = new Image();
//       img.onload = () => {
//         let imageX;
//         let imageY;
//         if(index==0){
//           imageX = 20;
//           imageY = 30;
//         }else if(index<4){
//           imageX = (100) * (index*3.5);
//           imageY = 30;
//         }else if(index === 4){ 
//           imageX = 22;
//           imageY = 360;
//         }else if(index<8){
//           let x = index-4;
//           imageX = 100 * (x*3.5);
//           imageY = 360;
//         }else if(index === 8){
//           imageX = 22;
//           imageY = 690;
//         }else{
//           let x = index-8;
//           imageX = 100 * (x*3.5);
//           imageY = 360;
//         }
        
//         ctx.filter = 'grayscale(100%)';
//         ctx.drawImage(img, imageX, imageY, 300, 300);
//         ctx.strokeStyle = 'black';
//         ctx.lineWidth = 4;
//         ctx.strokeRect(imageX, imageY, 300, 300);

//         ctx.font = '16px Arial';
//         const textWidth = ctx.measureText(url.anno).width;
//         const fontSize = Math.min(16, 200 / (textWidth || 1));

//         const circle1Radius = (textWidth > 20) ? (textWidth + 10) / 2 : 20;
//         const circle1X = imageX + 27;
//         const circle1Y = imageY + 27;
//         ctx.beginPath();
//         ctx.arc(circle1X, circle1Y, 20, 0, 2 * Math.PI);
//         ctx.fillStyle = 'white';
//         ctx.fill();
//         ctx.strokeStyle = 'aqua';
//         ctx.lineWidth = 2;
//         ctx.stroke();

//         const circle2X = imageX + 55;
//         const circle2Y = imageY + 45;
//         ctx.beginPath();
//         ctx.arc(circle2X, circle2Y, 8, 0, 2 * Math.PI);
//         ctx.fillStyle = 'white';
//         ctx.fill();
//         ctx.strokeStyle = 'aqua';
//         ctx.lineWidth = 2;
//         ctx.stroke();

//         ctx.fillStyle = 'black';
//         ctx.textAlign = 'center';
//         ctx.font = `${fontSize}px Arial`;
//         ctx.textBaseline = 'middle';
//         ctx.fillText(url.anno, circle1X, circle1Y);
//       };
//       img.onerror = (error) => {
//         console.error('Error loading image:', error);
//       };
//       img.src = url.url;
//     });
//   }, [images]);

//   const downloadCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) {
//       console.error('Canvas element not found');
//       return;
//     }
//     const link = document.createElement('a');
//     link.download = 'comic_page.png';
//     link.href = canvas.toDataURL('image/png');
//     link.click();
//   };

//   return (
//     <div>
//       <canvas ref={canvasRef} />
//       <center>
//         <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={downloadCanvas}>
//           Download Comic
//         </button>
//       </center>
//     </div>
//   );
// };

// export default HeroCanvas;
