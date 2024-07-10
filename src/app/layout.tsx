import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'react-day-picker/dist/style.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'plann.er',
  description: 'Planejador de Viagens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased`}>{children}</body>
    </html>
  )
}
