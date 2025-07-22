"use client"

import { useState } from "react"
import MapComponent from "../../map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, MapPin, Users, TrendingUp, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function MapPage() {
    const [filters, setFilters] = useState({
        showAlto: true,
        showMedio: true,
        showBajo: true,
        region: "all",
        comuna: "all"
    })

    const [comunasVisibles, setComunasVisibles] = useState(6)

    const handleFilterChange = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const resetFilters = () => {
        setFilters({
            showAlto: true,
            showMedio: true,
            showBajo: true,
            region: "all",
            comuna: "all"
        })
    }

    // Calcular elementos visibles basado en filtros
    const calcularElementosVisibles = () => {
        if (filters.comuna === "La Florida") {
            // Cuadrantes de La Florida
            const cuadrantes = [
                { idc: 0.71, name: "Manzana Centro Comercial" },
                { idc: 0.65, name: "Manzana Residencial Norte" },
                { idc: 0.61, name: "Manzana Sur Industrial" },
                { idc: 0.68, name: "Manzana Este Universitaria" },
                { idc: 0.52, name: "Manzana Oeste Residencial" },
                { idc: 0.45, name: "Manzana Noroeste" },
                { idc: 0.58, name: "Manzana Sureste" },
                { idc: 0.63, name: "Manzana Central" }
            ]

            return cuadrantes.filter(cuadrante => {
                const idcLevel = getIDCLevel(cuadrante.idc)
                return (
                    (idcLevel === 'alto' && filters.showAlto) ||
                    (idcLevel === 'medio' && filters.showMedio) ||
                    (idcLevel === 'bajo' && filters.showBajo)
                )
            }).length
        } else {
            // Comunas
            const comunas = [
                { name: "Santiago", idc: 0.75, region: "Metropolitana" },
                { name: "Providencia", idc: 0.82, region: "Metropolitana" },
                { name: "Las Condes", idc: 0.88, region: "Metropolitana" },
                { name: "Maipú", idc: 0.65, region: "Metropolitana" },
                { name: "La Florida", idc: 0.58, region: "Metropolitana" },
                { name: "Puente Alto", idc: 0.52, region: "Metropolitana" }
            ]

            return comunas.filter(comuna => {
                const idcLevel = getIDCLevel(comuna.idc)
                const showByIDC =
                    (idcLevel === 'alto' && filters.showAlto) ||
                    (idcLevel === 'medio' && filters.showMedio) ||
                    (idcLevel === 'bajo' && filters.showBajo)

                const showByRegion = filters.region === "all" || comunas.some(c => c.region === filters.region)
                const showByComuna = filters.comuna === "all" || comunas.some(c => c.name === filters.comuna)

                return showByIDC && showByRegion && showByComuna
            }).length
        }
    }

    const getIDCLevel = (idc: number) => {
        if (idc >= 0.60) return "alto"
        if (idc >= 0.50) return "medio"
        return "bajo"
    }
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header de la página */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapa Interactivo</h1>
                    <p className="text-gray-600">Explora la distribución geográfica del Índice de Densidad Comunitaria</p>
                </div>

                {/* Grid de contenido */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Mapa principal */}
                    <div className="lg:col-span-2">
                        <MapComponent filters={filters} />
                    </div>

                    {/* Panel lateral con información */}
                    <div className="space-y-6">
                        {/* Estadísticas del mapa */}
                        <Card className="border-orange-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                                    Estadísticas del Mapa
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{calcularElementosVisibles()}</div>
                                        <div className="text-sm text-gray-600">
                                            {filters.comuna === "La Florida" ? "Cuadrantes visibles" : "Comunas visibles"}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">0.71</div>
                                        <div className="text-sm text-gray-600">IDC Promedio</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">+5.2%</div>
                                    <div className="text-sm text-gray-600">Crecimiento anual</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Filtros */}
                        <Card className="border-orange-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Filter className="w-5 h-5 mr-2" />
                                    Filtros
                                </CardTitle>
                                <CardDescription>Personaliza la visualización del mapa</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Filtros por IDC */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Rangos BHT
                                    </label>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="alto"
                                                className="mr-2"
                                                checked={filters.showAlto}
                                                onChange={(e) => handleFilterChange('showAlto', e.target.checked)}
                                            />
                                            <label htmlFor="alto" className="text-sm text-gray-700">Alto (0.60-1.00)</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="medio"
                                                className="mr-2"
                                                checked={filters.showMedio}
                                                onChange={(e) => handleFilterChange('showMedio', e.target.checked)}
                                            />
                                            <label htmlFor="medio" className="text-sm text-gray-700">Medio (0.50-0.60)</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="bajo"
                                                className="mr-2"
                                                checked={filters.showBajo}
                                                onChange={(e) => handleFilterChange('showBajo', e.target.checked)}
                                            />
                                            <label htmlFor="bajo" className="text-sm text-gray-700">Bajo (0.00-0.50)</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Filtros por región */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Región
                                    </label>
                                    <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todas las regiones" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas las regiones</SelectItem>
                                            <SelectItem value="Metropolitana">Región Metropolitana</SelectItem>
                                            <SelectItem value="Valparaíso">Valparaíso</SelectItem>
                                            <SelectItem value="Biobío">Biobío</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Filtros por comuna */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-2">
                                        Comuna
                                    </label>
                                    <Select value={filters.comuna} onValueChange={(value) => handleFilterChange('comuna', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todas las comunas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas las comunas</SelectItem>
                                            <SelectItem value="Santiago">Santiago</SelectItem>
                                            <SelectItem value="Providencia">Providencia</SelectItem>
                                            <SelectItem value="Las Condes">Las Condes</SelectItem>
                                            <SelectItem value="Maipú">Maipú</SelectItem>
                                            <SelectItem value="La Florida">La Florida</SelectItem>
                                            <SelectItem value="Puente Alto">Puente Alto</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Botón de reset */}
                                <div className="pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={resetFilters}
                                        className="w-full"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Restablecer Filtros
                                    </Button>
                                </div>

                                {/* Información de filtros activos */}
                                <div className="pt-2">
                                    <div className="text-xs text-gray-600">
                                        <p>
                                            {filters.comuna === "La Florida" ? "Cuadrantes visibles" : "Comunas visibles"}:
                                            <span className="font-semibold">{calcularElementosVisibles()}</span>
                                        </p>
                                        <p>Filtros activos: <span className="font-semibold">
                                            {[
                                                filters.showAlto && 'Alto',
                                                filters.showMedio && 'Medio',
                                                filters.showBajo && 'Bajo'
                                            ].filter(Boolean).join(', ')}
                                        </span></p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información de ayuda */}
                        <Card className="border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Ayuda</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Rojo: IDC muy alto (0.8-1.0)</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Naranja: IDC alto (0.6-0.8)</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Amarillo: IDC medio (0.4-0.6)</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Gris: IDC bajo (0.0-0.4)</p>
                                </div>
                                <p className="pt-2 text-xs">
                                    {filters.comuna === "La Florida"
                                        ? "Haz clic en los cuadrantes para ver información detallada de cada zona."
                                        : "Haz clic en los marcadores para ver más información sobre cada comuna."
                                    }
                                </p>
                                {filters.comuna === "La Florida" && (
                                    <div className="pt-2 p-3 bg-orange-50 rounded border border-orange-200">
                                        <p className="text-xs font-semibold text-orange-800 mb-1">Vista de Cuadrantes - La Florida</p>
                                        <p className="text-xs text-orange-700">
                                            Visualización detallada por manzanas y agrupaciones de manzanas en La Florida.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
} 