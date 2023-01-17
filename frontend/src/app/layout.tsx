"use client"

import Navbar from "@/components/Navbar"
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../chakra/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ChakraProvider theme={theme}>
          <Navbar />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
