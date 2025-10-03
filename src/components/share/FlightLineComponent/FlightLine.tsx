"use client";

import React from "react";

export interface StopInfo {
  airport: string;
  duration: string;
}

export interface FlightLineProps {
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  stops: string;
  stopInfo?: StopInfo[];
  className?: string;
}

export const FlightLine: React.FC<FlightLineProps> = ({
  departureTime,
  departureCity,
  arrivalTime,
  arrivalCity,
  duration,
  stops,
  stopInfo = [],
  className = "",
}) => {
  const isDirect = stops === "Direct";
  
  return (
    <div className={`flex flex-col px-2 w-full ${className}`}>
      <div className="relative py-2">
        <div className="relative flex items-center w-full">
          {/* Departure */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-base font-bold">{departureTime}</div>
              <div className="text-xs text-gray-600">{departureCity}</div>
            </div>
            
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-red-300"></div>
              </div>
            </div>
          </div>
          
          {/* Flight line */}
          <div className="flex-1 h-[1px] mx-1 bg-red-300 relative">
            {/* Stop points */}
            {!isDirect && stopInfo.map((stop, index) => (
              <div 
                key={index} 
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{ left: `${(index + 1) * 100 / (stopInfo.length + 1)}%` }}
              >
                <div className="w-3 h-3 border border-red-400 bg-white"></div>
              </div>
            ))}
            
            {/* Duration and stops */}
            <div className="absolute w-full text-center -top-9">
              <div className="inline-block text-xs text-gray-600 font-medium">
                {duration} • {stops}
              </div>
            </div>
          </div>
          
          {/* Arrival */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-4 h-4 bg-red-300 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-red-600"></div>
              </div>
            </div>
            
            <div className="text-left">
              <div className="text-base font-bold">{arrivalTime}</div>
              <div className="text-xs text-gray-600">{arrivalCity}</div>
            </div>
          </div>
        </div>
        
        {/* Stop information */}
        {!isDirect && stopInfo.length > 0 && (
          <div className="mt-1">
            <div className="flex flex-wrap justify-center gap-2">
              {stopInfo.map((stop, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center text-xs"
                >
                  <span className="text-gray-700">{stop.duration} in {stop.airport}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 