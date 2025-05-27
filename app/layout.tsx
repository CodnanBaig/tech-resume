'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import theme from '@/lib/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from './contexts/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}