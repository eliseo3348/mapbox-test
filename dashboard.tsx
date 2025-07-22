"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  Users,
  Filter,
  Calendar,
  BarChart3,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ObservatorioDashboard() {
  const [poblacion, setPoblacion] = useState([10000, 100000])
  const [anio, setAnio] = useState([2020, 2024])
  const [filtrosAplicados, setFiltrosAplicados] = useState(false)

  // Datos de ejemplo para las gráficas comparativas
  const datosComparativos = [
    { nombre: "Santiago", valor2023: 0.75, valor2024: 0.78, poblacion: 85000 },
    { nombre: "Providencia", valor2023: 0.82, valor2024: 0.85, poblacion: 45000 },
    { nombre: "Las Condes", valor2023: 0.88, valor2024: 0.89, poblacion: 62000 },
    { nombre: "Maipú", valor2023: 0.65, valor2024: 0.68, poblacion: 120000 },
    { nombre: "La Florida", valor2023: 0.58, valor2024: 0.62, poblacion: 95000 },
    { nombre: "Puente Alto", valor2023: 0.52, valor2024: 0.56, poblacion: 110000 },
  ]

  const aplicarFiltros = () => {
    setFiltrosAplicados(true)
    // Aquí se aplicarían los filtros reales
    console.log("Filtros aplicados")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simplificado con logos */}
      <header className="bg-white border-b-4 border-orange-500 px-4 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Logos centrados */}
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-semibold text-gray-800">Programa PIC</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-semibold text-gray-800">Observatorio de las Comunidades</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-xs font-semibold text-gray-800">
                  <span className="font-bold">UDLA</span>
                  <br />
                  Universidad de Las Américas
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Sección de Presentación del Índice */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Índice de Densidad Comunitaria (IDC)</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            El IDC mide la fortaleza de las comunidades a través de dimensiones sociales, territoriales y culturales,
            proporcionando una visión integral del desarrollo comunitario en Chile.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white hover:bg-orange-50 border-orange-500 text-orange-600 shadow-md"
          >
            <FileText className="w-5 h-5 mr-2" />
            Ver Manual (PDF)
          </Button>
        </div>

        {/* Filtros de Navegación y Exploración */}
        <Card className="mb-8 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Exploración
            </CardTitle>
            <CardDescription className="text-orange-100">
              Segmenta y explora los datos según tus criterios de interés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Filtros Desplegables */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Región</label>
                <Select>
                  <SelectTrigger className="h-11 border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Seleccionar región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metropolitana">Región Metropolitana</SelectItem>
                    <SelectItem value="valparaiso">Valparaíso</SelectItem>
                    <SelectItem value="biobio">Biobío</SelectItem>
                    <SelectItem value="araucania">La Araucanía</SelectItem>
                    <SelectItem value="antofagasta">Antofagasta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Comuna</label>
                <Select>
                  <SelectTrigger className="h-11 border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Seleccionar comuna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="santiago">Santiago</SelectItem>
                    <SelectItem value="providencia">Providencia</SelectItem>
                    <SelectItem value="las-condes">Las Condes</SelectItem>
                    <SelectItem value="maipu">Maipú</SelectItem>
                    <SelectItem value="la-florida">La Florida</SelectItem>
                    <SelectItem value="puente-alto">Puente Alto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Barrio</label>
                <Select>
                  <SelectTrigger className="h-11 border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Seleccionar barrio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro">Centro Histórico</SelectItem>
                    <SelectItem value="norte">Sector Norte</SelectItem>
                    <SelectItem value="sur">Sector Sur</SelectItem>
                    <SelectItem value="oriente">Sector Oriente</SelectItem>
                    <SelectItem value="poniente">Sector Poniente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-2 block">Dimensión del Índice</label>
                <Select>
                  <SelectTrigger className="h-11 border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Seleccionar dimensión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">IDC General</SelectItem>
                    <SelectItem value="social">Dimensión Social</SelectItem>
                    <SelectItem value="territorial">Dimensión Territorial</SelectItem>
                    <SelectItem value="cultural">Dimensión Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-orange-200" />

            {/* Controles Deslizantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-sm font-medium text-gray-800 mb-3 block">
                  <Users className="w-4 h-4 inline mr-1" />
                  Población: {poblacion[0].toLocaleString()} - {poblacion[1].toLocaleString()} habitantes
                </label>
                <Slider
                  value={poblacion}
                  onValueChange={setPoblacion}
                  max={200000}
                  min={1000}
                  step={5000}
                  className="w-full [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-500 [&_.bg-primary]:bg-orange-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 mb-3 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Año de aplicación: {anio[0]} - {anio[1]}
                </label>
                <Slider
                  value={anio}
                  onValueChange={setAnio}
                  max={2024}
                  min={2018}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-500 [&_.bg-primary]:bg-orange-500"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button onClick={aplicarFiltros} size="lg" className="bg-orange-500 hover:bg-orange-600 px-8 shadow-lg">
                <Filter className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visualizaciones Centrales */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Mapa Interactivo */}
          <Card className="h-fit border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <MapPin className="w-5 h-5 mr-2" />
                Mapa Territorial Interactivo
              </CardTitle>
              <CardDescription className="text-orange-100">
                Visualización georreferenciada del IDC por zonas geográficas
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="aspect-square bg-gradient-to-br from-orange-50 via-orange-100 to-gray-50 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center relative overflow-hidden">
                {/* Simulación de mapa */}
                <div className="absolute inset-4 bg-white rounded opacity-90 shadow-inner"></div>
                <div className="absolute top-8 left-8 w-16 h-12 bg-orange-400 rounded opacity-80 shadow-md"></div>
                <div className="absolute top-12 right-12 w-20 h-16 bg-orange-500 rounded opacity-80 shadow-md"></div>
                <div className="absolute bottom-12 left-12 w-24 h-20 bg-orange-600 rounded opacity-80 shadow-md"></div>
                <div className="absolute bottom-8 right-8 w-18 h-14 bg-gray-400 rounded opacity-80 shadow-md"></div>

                <div className="text-center z-10">
                  {/* AQUI DEBE IR EL MAOA DE MAPBOX */}
                  <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-3" />
                  <p className="text-gray-800 font-semibold text-lg">Mapa Interactivo</p>
                  <p className="text-sm text-gray-600">Preparado para integración con Mapbox</p>
                  <Badge variant="outline" className="mt-2 border-orange-500 text-orange-600">
                    Zoom y Tooltip habilitados
                  </Badge>
                </div>
              </div>

              {/* Leyenda del mapa */}
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-semibold text-gray-800 mb-3">Leyenda IDC por Color</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2 shadow-sm"></div>
                    <span className="text-gray-700">Bajo (0.0 - 0.4)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-2 shadow-sm"></div>
                    <span className="text-gray-700">Medio (0.4 - 0.6)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-400 rounded mr-2 shadow-sm"></div>
                    <span className="text-gray-700">Alto (0.6 - 0.8)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-600 rounded mr-2 shadow-sm"></div>
                    <span className="text-gray-700">Muy Alto (0.8 - 1.0)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráficas Comparativas */}
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <BarChart3 className="w-5 h-5 mr-2" />
                Datos Comparativos
              </CardTitle>
              <CardDescription className="text-orange-100">
                Comparación interanual por comuna seleccionada
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Gráfica de barras horizontal con scroll */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {datosComparativos.map((item, index) => (
                  <div key={index} className="space-y-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{item.nombre}</span>
                      <div className="text-xs text-gray-600">Población: {item.poblacion.toLocaleString()}</div>
                    </div>

                    {/* Barras comparativas 2023 vs 2024 */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 w-12">2023:</span>
                        <div className="flex-1 bg-orange-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-orange-400 shadow-sm"
                            style={{ width: `${item.valor2023 * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold w-12 text-gray-800">{item.valor2023.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 w-12">2024:</span>
                        <div className="flex-1 bg-orange-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-orange-600 shadow-sm"
                            style={{ width: `${item.valor2024 * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold w-12 text-gray-800">{item.valor2024.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Indicador de cambio */}
                    <div className="text-right">
                      <Badge
                        variant={item.valor2024 > item.valor2023 ? "default" : "secondary"}
                        className={`text-xs ${item.valor2024 > item.valor2023
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {item.valor2024 > item.valor2023 ? "↗" : "↘"}
                        {((item.valor2024 - item.valor2023) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen estadístico */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-lg border border-orange-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">0.71</p>
                    <p className="text-xs text-gray-600">IDC Promedio 2024</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">+5.2%</p>
                    <p className="text-xs text-orange-500">Crecimiento Interanual</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área de Descarga de Datos */}
        <Card className="border-orange-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Descarga de Datos</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Exporta los datos filtrados en diferentes formatos. La descarga incluirá únicamente los datos que
                coincidan con los filtros aplicados.
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 shadow-lg">
                    <Download className="w-5 h-5 mr-2" />
                    Descargar Datos
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem className="cursor-pointer hover:bg-orange-50">
                    <Download className="w-4 h-4 mr-2 text-orange-600" />
                    Excel (.xlsx)
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-orange-50">
                    <Download className="w-4 h-4 mr-2 text-orange-600" />
                    CSV (.csv)
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-orange-50">
                    <Download className="w-4 h-4 mr-2 text-orange-600" />
                    Shapefile georreferenciado (.shp)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {filtrosAplicados && (
                <div className="mt-4">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    ✓ Filtros aplicados - Descarga personalizada lista
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
