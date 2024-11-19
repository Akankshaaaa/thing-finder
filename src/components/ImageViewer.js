import React, { useState } from 'react';
import { XMarkIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

const ImageViewer = ({ imageUrl, onClose, altText }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
         onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center"
           onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-pastel-pink transition-colors"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>

        {/* Zoom controls */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            disabled={scale <= 1}
          >
            <MagnifyingGlassMinusIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            disabled={scale >= 4}
          >
            <MagnifyingGlassPlusIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Image container */}
        <div
          className="overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={imageUrl}
            alt={altText}
            className="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              cursor: scale > 1 ? 'grab' : 'default'
            }}
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer; 