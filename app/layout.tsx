import type { Metadata } from 'next'
import './globals.css'
import { raleway } from './ui/fonts'


export const metadata: Metadata = {
  title: 'Kilometros',
  description: 'Sitio web privado para el calculo y registros de los KM de vehiculos empresariales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={raleway.className}>{children}</body>
    </html>
  )
}
