import React from 'react'

const PortfolioLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <main className="flex justify-center w-full min-h-screen bg-white">
        {children}
    </main>
  )
}

export default PortfolioLayout