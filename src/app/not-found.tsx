"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VoraLogo from "../../public/img/Vora Logo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src={VoraLogo}
              alt="Vora Logo"
              width={120}
              height={42}
              className="mx-auto mb-6 hover:opacity-80 transition-opacity duration-200"
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Side - Illustration */}
          <div className="flex-1 max-w-md lg:max-w-lg">
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50 rounded-full opacity-60 animate-pulse"></div>
              
              {/* Main Illustration */}
              <div className="relative bg-white rounded-full p-8 lg:p-12 shadow-lg border border-red-100">
                <div className="text-center">
                  {/* 404 Number */}
                  <div className="text-6xl lg:text-8xl font-bold text-red-500 mb-4 font-yekan-bakh">
                    404
                  </div>
                  
                  {/* Travel Icon */}
                  <div className="text-4xl lg:text-6xl mb-4">
                    <span className="i-fluent:airplane-24-filled text-red-500"></span>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="flex justify-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-red-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-200 rounded-full opacity-70 animate-float"></div>
              <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-red-300 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1 max-w-md lg:max-w-lg text-center lg:text-right">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  صفحه مورد نظر پیدا نشد
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
                </p>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  نگران نباشید! می‌توانید به صفحه اصلی بازگردید و از خدمات ما برای برنامه‌ریزی سفر خود استفاده کنید.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-all duration-200 hover:shadow-lg"
                  >
                    <span className="i-fluent:home-24-regular ml-2"></span>
                    بازگشت به صفحه اصلی
                  </Button>
                </Link>
                
                <Link href="/contactus">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto px-8 py-3 border-red-300 text-red-600 hover:bg-red-50 font-medium rounded-full transition-all duration-200"
                  >
                    <span className="i-fluent:chat-24-regular ml-2"></span>
                    تماس با پشتیبانی
                  </Button>
                </Link>
              </div>

              {/* Quick Links */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">لینک‌های مفید:</p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <Link 
                    href="/tickets" 
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    بلیط هواپیما
                  </Link>
                  <Link 
                    href="/hotels" 
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    هتل‌ها
                  </Link>
                  <Link 
                    href="/aboutus" 
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    درباره ما
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2024آرون تراول. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
