import React, { useEffect, useRef } from 'react';

const ResizableCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let previousContent;

    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      // Store the existing content in an image
      previousContent = new Image();
      previousContent.src = canvas.toDataURL();

      // Update canvas size upon window resize
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Redraw the previous content on the resized canvas
      context.drawImage(previousContent, 0, 0);

      // Additional drawing or updating logic can go here
      // For example, draw additional content on the resized canvas
      draw();
    };

    const draw = () => {
      // Example: draw a rectangle in the center of the canvas
      const rectSize = 50;
      context.fillRect((canvas.width - rectSize) / 2, (canvas.height - rectSize) / 2, rectSize, rectSize);
    };

    // Initial draw
    draw();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default ResizableCanvas;
