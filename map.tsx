"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Configura tu token de Mapbox aquí
mapboxgl.accessToken = "pk.eyJ1IjoiZWxpc2VvMzM0OCIsImEiOiJjbWRlbDFpZmkwM2h2MmpxM2VnNGc1YmJzIn0.0l2MKm1VB6PSTJ8kAdmDqQ"

interface MapComponentProps {
    className?: string
    filters?: {
        showAlto: boolean
        showMedio: boolean
        showBajo: boolean
        region?: string
        comuna?: string
    }
}

export default function MapComponent({ className, filters }: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [lng] = useState(-70.6483) // Santiago, Chile
    const [lat] = useState(-33.4489)
    const [zoom] = useState(9)

    useEffect(() => {
        if (map.current) return // initialize map only once

        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: [lng, lat],
                zoom: zoom,
                attributionControl: false
            })

            // Agregar controles de navegación
            map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

            // Agregar estilos CSS para los marcadores
            const style = document.createElement("style")
            style.textContent = `
        .marker:hover {
          transform: scale(1.1);
          transition: transform 0.2s ease;
        }
      `
            document.head.appendChild(style)
        }

        return () => {
            if (map.current) {
                map.current.remove()
            }
        }
    }, [lng, lat, zoom])

    // Efecto para actualizar marcadores cuando cambien los filtros
    useEffect(() => {
        if (!map.current) return

        // Limpiar marcadores existentes
        const markers = document.querySelectorAll('.mapboxgl-marker')
        markers.forEach(marker => marker.remove())

        // Agregar marcadores de ejemplo para comunas
        const comunas = [
            { name: "Santiago", lng: -70.6483, lat: -33.4489, idc: 0.75, region: "Metropolitana" },
            { name: "Providencia", lng: -70.6333, lat: -33.4167, idc: 0.82, region: "Metropolitana" },
            { name: "Las Condes", lng: -70.5667, lat: -33.4167, idc: 0.88, region: "Metropolitana" },
            { name: "Maipú", lng: -70.7667, lat: -33.5167, idc: 0.65, region: "Metropolitana" },
            { name: "La Florida", lng: -70.5833, lat: -33.5500, idc: 0.58, region: "Metropolitana" },
            { name: "Puente Alto", lng: -70.5833, lat: -33.6167, idc: 0.52, region: "Metropolitana" }
        ]

        // Filtrar comunas según los filtros
        const comunasFiltradas = comunas.filter(comuna => {
            // Filtrar por rango de IDC
            const idcLevel = getIDCLevel(comuna.idc)
            const showByIDC =
                (idcLevel === 'alto' && filters?.showAlto !== false) ||
                (idcLevel === 'medio' && filters?.showMedio !== false) ||
                (idcLevel === 'bajo' && filters?.showBajo !== false)

            // Filtrar por región
            const showByRegion = !filters?.region || filters.region === "all" || comunas.some(c => c.region === filters.region)

            // Filtrar por comuna específica
            const showByComuna = !filters?.comuna || filters.comuna === "all" || comunas.some(c => c.name === filters.comuna)

            return showByIDC && showByRegion && showByComuna
        })

        comunasFiltradas.forEach(comuna => {
            // Crear elemento del marcador
            const el = document.createElement("div")
            el.className = "marker"
            el.style.width = "20px"
            el.style.height = "20px"
            el.style.borderRadius = "50%"
            el.style.backgroundColor = getColorByIDC(comuna.idc)
            el.style.border = "2px solid white"
            el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)"
            el.style.cursor = "pointer"

            // Agregar marcador al mapa
            if (map.current) {
                new mapboxgl.Marker(el)
                    .setLngLat([comuna.lng, comuna.lat])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(`
                <div style="padding: 8px;">
                  <h3 style="margin: 0 0 4px 0; font-weight: bold;">${comuna.name}</h3>
                  <p style="margin: 0; color: #666;">IDC: ${comuna.idc}</p>
                  <p style="margin: 0; color: #666;">Región: ${comuna.region}</p>
                </div>
              `)
                    )
                    .addTo(map.current)
            }
        })
    }, [filters])

    const getColorByIDC = (idc: number) => {
        if (idc >= 0.8) return "#dc2626" // Rojo - Muy alto
        if (idc >= 0.6) return "#f97316" // Naranja - Alto
        if (idc >= 0.4) return "#eab308" // Amarillo - Medio
        return "#6b7280" // Gris - Bajo
    }

    const getIDCLevel = (idc: number) => {
        if (idc >= 0.8) return "alto"
        if (idc >= 0.6) return "medio"
        return "bajo"
    }

    const handleZoomIn = () => {
        if (map.current) {
            map.current.zoomIn()
        }
    }

    const handleZoomOut = () => {
        if (map.current) {
            map.current.zoomOut()
        }
    }

    const handleReset = () => {
        if (map.current) {
            map.current.flyTo({ center: [lng, lat], zoom: zoom })
        }
    }

    return (
        <Card className={`border-orange-200 shadow-lg ${className}`}>
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
                <div className="relative">
                    {/* Controles personalizados */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleZoomIn}
                            className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleZoomOut}
                            className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={handleReset}
                            className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Contenedor del mapa */}
                    <div
                        ref={mapContainer}
                        className="aspect-square rounded-lg border-2 border-orange-300 overflow-hidden"
                        style={{ minHeight: "400px" }}
                    />

                    {/* Leyenda */}
                    <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm font-semibold text-gray-800 mb-3">Leyenda IDC por Color</p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-red-500 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Muy Alto (0.8 - 1.0)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-orange-500 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Alto (0.6 - 0.8)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Medio (0.4 - 0.6)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-500 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Bajo (0.0 - 0.4)</span>
                            </div>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                        <Badge variant="outline" className="border-orange-500 text-orange-600">
                            Zoom y Tooltip habilitados
                        </Badge>
                        <span>Haz clic en los marcadores para más información</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
