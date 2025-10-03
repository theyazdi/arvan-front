import React from 'react';

interface AmenityIconProps {
  iconIdentifier: string;
  className?: string;
}


const defaultClassName = "w-3 h-3 md:w-5 md:h-5 text-gray-600";

export const AmenityIcon: React.FC<AmenityIconProps> = ({ 
  iconIdentifier, 
  className = defaultClassName 
}) => {
  const identifier = iconIdentifier?.toLowerCase() || '';

  switch (identifier) {
    case "wifi": 
      return <span className={`i-fluent:wifi-2-regular ${className}`}></span>;
    case "food":
    case "breakfast":
    case "restaurant": 
      return <span className={`i-fluent:food-24-regular ${className}`}></span>;
    case "bar": 
      return <span className={`i-fluent:drink-beer-24-regular ${className}`}></span>;
    case "spa": 
      return <span className={`i-fluent:leaf-two-24-regular ${className}`}></span>;
    case "parking": 
      return <span className={`i-fluent:vehicle-car-24-regular ${className}`}></span>;
    case "gym": 
      return <span className={`i-fluent:building-retail-24-regular ${className}`}></span>;
    default:
      return <span className={`i-fluent:home-24-regular ${className}`}></span>;
  }
}; 