"use client";

import React from 'react';

interface HotelDetailErrorProps {
  error: string;
  onRetry: () => void;
}

export const HotelDetailError: React.FC<HotelDetailErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
      <p className="text-gray-600">{error || 'Hotel not found'}</p>
      <button 
        onClick={onRetry} 
        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Try Again
      </button>
    </div>
  );
}; 