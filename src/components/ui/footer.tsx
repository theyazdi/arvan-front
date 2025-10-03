"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VoraLogo from "../../../public/img/Vora Logo.png";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      <div className="md:hidden relative max-w-7xl mx-auto my-10 mt-40 rounded-3xl overflow-hidden shadow-sm" style={{
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), lightgray 50% / cover no-repeat'
      }} dir="rtl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white opacity-30 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white opacity-40 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white opacity-50 rounded-full blur-lg" />
        
        <div className="relative z-10 p-8 text-right">
          <div className="flex justify-start mb-6">
            <Link href="/">
              <Image src={VoraLogo} alt="Vora Logo" width={120} height={50} />
            </Link>
          </div>
          
          <p className="text-gray-700 text-sm leading-6 text-right mb-8">
            هوشمندانه سفر کن.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection('smartTravel')}
                className="w-full px-4 py-3 flex items-center justify-between text-right"
              >
                <span className="font-medium text-gray-800">سفر هوشمند</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSections.smartTravel ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.smartTravel && (
                <div className="px-4 pb-3 border-t border-gray-100">
                  <ul className="space-y-2 pt-3 text-gray-700">
                    <li>
                      <Link href="#" className="hover:text-black block py-1">
                        برنامه‌ریز سفر
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-black block py-1">
                        سفر بر اساس بودجه
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-black block py-1">
                        محاسبه هزینه سفر
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection('services')}
                className="w-full px-4 py-3 flex items-center justify-between text-right"
              >
                <span className="font-medium text-gray-800">خدمات</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSections.services ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.services && (
                <div className="px-4 pb-3 border-t border-gray-100">
                  <ul className="space-y-2 pt-3 text-gray-700">
                    <li>
                      <Link href="#" className="hover:text-black block py-1">
                        رزرو هتل و اقامتگاه
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-black block py-1">
                        رزرو بلیط هواپیما
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-black block py-1">
                        ویزای امارات
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection('aboutVora')}
                className="w-full px-4 py-3 flex items-center justify-between text-right"
              >
                <span className="font-medium text-gray-800">درباره آرون</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${expandedSections.aboutVora ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.aboutVora && (
                <div className="px-4 pb-3 border-t border-gray-100">
                  <ul className="space-y-2 pt-3 text-gray-700">
                    <li>
                      <Link href="contactus" className="hover:text-black block py-1">
                        تماس با ما
                      </Link>
                    </li>
                    <li>
                      <Link href="aboutus" className="hover:text-black block py-1">
                        درباره ما
                      </Link>
                    </li>
                    <li>
                      <Link href="blog/" className="hover:text-black block py-1">
                        بلاگ‌ها
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block relative max-w-7xl mx-auto my-10 mt-40 rounded-3xl overflow-hidden shadow-sm bg-gradient-to-tr from-[#f6f6f6] to-[#fafafa]" dir="rtl">
        <div className="absolute -top-60 -left-1 w-1/2 h-[600px] bg-gray-700 opacity-10 rotate-[-45deg] rounded-3xl pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row-reverse justify-between items-start gap-10 text-right">
          <div className="flex flex-1 justify-between w-full max-w-2xl text-right flex-row">
            <div>
              <div className="font-bold text-lg mb-3 text-gray-800">خدمات</div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link href="#" className="hover:text-black">
                    رزرو هتل و اقامتگاه
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    رزرو بلیط هواپیما
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    ویزای امارات
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-lg mb-3 text-gray-800">
                سفر هوشمند
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link href="#" className="hover:text-black">
                    برنامه‌ریز سفر
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    سفر بر اساس بودجه
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    محاسبه هزینه سفر
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-lg mb-3 text-gray-800">
                درباره آرون
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <Link href="contactus" className="hover:text-black">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="aboutus" className="hover:text-black">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="blog/" className="hover:text-black">
                    بلاگ‌ها
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1 min-w-[250px] flex flex-col  ">
            <Link href="/">
              <Image src={VoraLogo} alt="Vora Logo" width={100} height={40} />
            </Link>
            <p className="text-gray-700 w-full text-sm leading-6 max-w-xs">
              هوشمندانه سفر کن.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { Footer };
