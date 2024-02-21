import type { Metadata } from 'next'
import './globals.css'
import { lato } from './ui/fonts'


export const metadata: Metadata = {
  title: 'Kilometros App',
  description: 'Sitio web privado para el calculo y registros de los KM de vehiculos empresariales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="Arcor icon" href="/favicon.ico" type="image/x-icon" sizes='any' />
      </head>
      <body className={lato.className}>{children}</body>
    </html>
  )
}
