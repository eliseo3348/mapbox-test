import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: 'Observatorio UDLA - Dashboard',
  description: 'Observatorio de las Comunidades - Universidad de Las Américas',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        <link href='https://api.mapbox.com/mapbox-gl-js/v3.13.0/mapbox-gl.css' rel='stylesheet' />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
