"use client";

import { Home24Regular } from "@fluentui/react-icons";
import { SectionHeader } from "../common/SectionHeader";

interface AboutPropertySectionProps {
  description: string;
}

export const AboutPropertySection: React.FC<AboutPropertySectionProps> = ({ description }) => (
  <div>
    <SectionHeader 
      icon={<span className="i-fluent:home-24-regular w-5 h-5"></span>}
      title="About Property"
    />
    <div className="space-y-4 text-gray-600">
      {description.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  </div>
); 