import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai_Looped } from 'next/font/google';
import './globals.css';
import 'react-tooltip/dist/react-tooltip.css'
import { ToasterProvider } from '@/components/toaster-provider';
import Providers from '@/components/Providers';

const font = IBM_Plex_Sans_Thai_Looped({
  subsets: ["latin", "thai"],
  weight: ['100','200','300','400','500','600','700'],
  variable: '--font-ibm',
});

export const metadata: Metadata = {
  title: '4337 Smart Wallet',
  description: '4337 Smart Wallet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <title>
            Helping web2 users to easily and securely access web3 by account abstraction wallet(ERC4337) and passkey.
          </title>
          <link rel="icon" type="image/x-icon" href="./icon.png"></link>
        </head>
        <body className={font.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </Providers>
  )
}
