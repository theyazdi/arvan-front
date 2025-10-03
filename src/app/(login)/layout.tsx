import React, { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 py-8 sm:py-12 md:py-16 lg:py-20">
      {children}
    </div>
  );
}

export default Layout