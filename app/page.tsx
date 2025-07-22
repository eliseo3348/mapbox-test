"use client"

import Link from "next/link"
import { BarChart3, Users, TrendingUp, MapPin, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-semibold">Programa PIC</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-semibold">Observatorio de las Comunidades</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-sm font-semibold">
                  <span className="font-bold">UDLA</span>
                  <br />
                  Universidad de Las Américas
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-6">Observatorio de las Comunidades</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            El Índice de Densidad Comunitaria (IDC) mide la fortaleza de las comunidades a través de
            dimensiones sociales, territoriales y culturales, proporcionando una visión integral del
            desarrollo comunitario en Chile.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8">
                <BarChart3 className="w-5 h-5 mr-2" />
                Explorar Dashboard
              </Button>
            </Link>
            <Link href="/admin-panel">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                <TrendingUp className="w-5 h-5 mr-2" />
                Panel Administrativo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Características Principales</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Visualización Territorial</CardTitle>
                <CardDescription>
                  Mapas interactivos que muestran la distribución geográfica del IDC por regiones y comunas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Análisis Comparativo</CardTitle>
                <CardDescription>
                  Comparaciones interanuales y análisis de tendencias del desarrollo comunitario
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Exportación de Datos</CardTitle>
                <CardDescription>
                  Descarga de datos en múltiples formatos para análisis externo y reportes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Listo para explorar?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Accede al dashboard para explorar los datos del Índice de Densidad Comunitaria
            o utiliza el panel administrativo para gestionar la información.
          </p>

          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                <BarChart3 className="w-5 h-5 mr-2" />
                Ir al Dashboard
              </Button>
            </Link>
            <Link href="/admin-panel">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8">
                <FileText className="w-5 h-5 mr-2" />
                Panel Admin
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
