'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import theme from '@/lib/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Header />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  )
}