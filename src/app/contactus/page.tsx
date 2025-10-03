import React from 'react'
import { Metadata } from "next";
import { Communication, ContactHero, ContactHeroImage, ContactStats } from '@/app/contactus/index'
import { Faq } from '../components'
import { Navbar, Footer, BottomNavigationWrapper } from '@/components/ui'
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata("/contactus");

function page() {
  return (
    <BottomNavigationWrapper>
      <Navbar />
      <main className="container mx-auto py-10 px-4 md:px-0">
        <ContactHeroImage />
        <div className='flex flex-col gap-16 md:gap-36 max-w-7xl mx-auto mt-8 md:mt-14'>
          <ContactHero />
          <ContactStats />
          <Communication />
          <Faq type="contentus" />
        </div>
      </main>
      <Footer />
    </BottomNavigationWrapper>
  )
}export default page

