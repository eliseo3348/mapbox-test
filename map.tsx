"use client"

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

// Configurar el token de Mapbox
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
    const [lng] = useState(-70.6483)
    const [lat] = useState(-33.4489)
    const [zoom] = useState(10)

    // Efecto para inicializar el mapa
    useEffect(() => {
        if (map.current) return // Inicializar el mapa solo una vez

        if (mapContainer.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            })

            // Agregar controles de navegación
            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
        }
    }, [lng, lat, zoom])

    // Efecto para actualizar marcadores cuando cambien los filtros
    useEffect(() => {
        if (!map.current) return

        // Esperar a que el estilo esté completamente cargado
        const addLayersAfterStyleLoad = () => {
            if (!map.current) return

            // Limpiar marcadores existentes y fuentes
            const markers = document.querySelectorAll('.mapboxgl-marker')
            markers.forEach(marker => marker.remove())

            // Limpiar fuentes existentes
            if (map.current.getSource('cuadrantes')) {
                map.current.removeLayer('cuadrantes-fill')
                map.current.removeLayer('cuadrantes-border')
                map.current.removeSource('cuadrantes')
            }

            // Si se selecciona La Florida, mostrar cuadrantes
            if (filters?.comuna === "La Florida" || filters?.comuna === "all") {
                // Datos de cuadrantes de La Florida (manzanas reales)
                const cuadrantesLaFlorida = [
                    {
                        id: "manzana-1",
                        name: "Manzana Real 1",
                        coordinates: [
                            [-70.578526252713, -33.522558818190824],
                            [-70.57728911325151, -33.522538052468214],
                            [-70.57708153951613, -33.522946444111],
                            [-70.57704002476908, -33.52325792796564],
                            [-70.57567003811683, -33.52545212689045],
                            [-70.57602706494141, -33.5256528552431],
                            [-70.576384091766, -33.52570822849964],
                            [-70.57712305426321, -33.52599893751584],
                            [-70.57850964681451, -33.52257266200375],
                            [-70.578526252713, -33.522558818190824]
                        ],
                        idc: 0.45,
                        poblacion: 15000,
                        area: "0.05 km²"
                    },
                    {
                        id: "manzana-2",
                        name: "Manzana Real 2",
                        coordinates: [
                            [-70.57730571915057, -33.522524208649735],
                            [-70.57577797645958, -33.52251036482899],
                            [-70.57571155286391, -33.52278724081826],
                            [-70.5744162927563, -33.52496068654371],
                            [-70.57567003811683, -33.52545212689045],
                            [-70.57704832771861, -33.523244084262394],
                            [-70.57711475131369, -33.52291875660258],
                            [-70.57729741620105, -33.522538052468214],
                            [-70.57730571915057, -33.522524208649735]
                        ],
                        idc: 0.55,
                        poblacion: 17500,
                        area: "0.04 km²"
                    },
                    {
                        id: "manzana-3",
                        name: "Manzana Real 3",
                        coordinates: [
                            [-70.57571985581345, -33.522524208649735],
                            [-70.57315934278088, -33.5224141779904],
                            [-70.57223590250227, -33.5243387673499],
                            [-70.57321366279712, -33.52461047063319],
                            [-70.57387908299785, -33.52467839632002],
                            [-70.57443586316603, -33.524882173062835],
                            [-70.57569880354735, -33.522776456906406],
                            [-70.5757531235636, -33.52250474786146],
                            [-70.57571985581345, -33.522524208649735]
                        ],
                        idc: 0.65,
                        poblacion: 20000,
                        area: "0.06 km²"
                    },
                    {
                        id: "manzana-4",
                        name: "Manzana Real 4",
                        coordinates: [
                            [-70.57310787588936, -33.52240261605788],
                            [-70.5676436156454, -33.52238254825977],
                            [-70.56574195679364, -33.52697795239928],
                            [-70.56860648088657, -33.52737928614344],
                            [-70.5717598645511, -33.527359219501506],
                            [-70.5717357929205, -33.52675721804507],
                            [-70.57212093901684, -33.525874274995054],
                            [-70.57274680142362, -33.52448964160582],
                            [-70.5722172255407, -33.52430903561642],
                            [-70.57315601915131, -33.5224828872023],
                            [-70.57310787588936, -33.52240261605788]
                        ],
                        idc: 0.70,
                        poblacion: 22500,
                        area: "0.28 km²"
                    },
                    {
                        id: "manzana-5",
                        name: "Manzana Real 5",
                        coordinates: [
                            [-70.57179199615503, -33.52727715872454],
                            [-70.57174428169228, -33.52656119007783],
                            [-70.57279399985885, -33.52445302574896],
                            [-70.57389143248663, -33.524691688441955],
                            [-70.57470257834254, -33.525129235000065],
                            [-70.57565686758439, -33.52548722599203],
                            [-70.57694515806082, -33.52596454500997],
                            [-70.57608629774293, -33.52866930301333],
                            [-70.57265085647217, -33.5272373828449],
                            [-70.57183971061704, -33.52727715872454],
                            [-70.57179199615503, -33.52727715872454]
                        ],
                        idc: 0.75,
                        poblacion: 25000,
                        area: "0.13 km²"
                    },
                    {
                        id: "manzana-6",
                        name: "Manzana Real 6",
                        coordinates: [
                            [-70.56764083795227, -33.522344810030965],
                            [-70.56577997393056, -33.526919175142126],
                            [-70.56067452648676, -33.52644186139332],
                            [-70.56072224094873, -33.525805438963765],
                            [-70.56158110126664, -33.52226525371488],
                            [-70.567831695801, -33.52238458816092],
                            [-70.56577997393056, -33.52695895116953],
                            [-70.56764083795227, -33.522344810030965]
                        ],
                        idc: 0.35,
                        poblacion: 27500,
                        area: "0.25 km²"
                    },
                    {
                        id: "manzana-7",
                        name: "Manzana Real 7",
                        coordinates: [
                            [-70.57612578409665, -33.52872748983536],
                            [-70.57254166922398, -33.52725679442784],
                            [-70.56857231096357, -33.52739455917438],
                            [-70.56559577268257, -33.527072676067135],
                            [-70.56377753897715, -33.53235746584216],
                            [-70.5738106044525, -33.53162264140541],
                            [-70.57485798813134, -33.53185255430572],
                            [-70.57601553231119, -33.52863555482138],
                            [-70.57612578409665, -33.52872748983536]
                        ],
                        idc: 0.42,
                        poblacion: 30000,
                        area: "0.48 km²"
                    },
                    {
                        id: "manzana-8",
                        name: "Manzana Real 8",
                        coordinates: [
                            [-70.56383265006735, -33.532311518835414],
                            [-70.56328190383692, -33.53217342752508],
                            [-70.55909355474277, -33.53231079136383],
                            [-70.56019564460979, -33.52982949073004],
                            [-70.56030485254236, -33.52808344041396],
                            [-70.5606901969337, -33.52633714920933],
                            [-70.56570604465516, -33.52707267497501],
                            [-70.56372245751284, -33.53235744523237],
                            [-70.56383265006735, -33.532311518835414]
                        ],
                        idc: 0.51,
                        poblacion: 32500,
                        area: "0.26 km²"
                    }
                ];

                // Filtrar cuadrantes por IDC
                const cuadrantesFiltrados = cuadrantesLaFlorida.filter(cuadrante => {
                    const idcLevel = getIDCLevel(cuadrante.idc)
                    return (
                        (idcLevel === 'alto' && filters?.showAlto !== false) ||
                        (idcLevel === 'medio' && filters?.showMedio !== false) ||
                        (idcLevel === 'bajo' && filters?.showBajo !== false)
                    )
                })

                // Agregar fuente de datos para cuadrantes
                if (map.current) {
                    map.current.addSource('cuadrantes', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: cuadrantesFiltrados.map(cuadrante => ({
                                type: 'Feature',
                                id: cuadrante.id,
                                properties: {
                                    name: cuadrante.name,
                                    idc: cuadrante.idc,
                                    poblacion: cuadrante.poblacion,
                                    area: cuadrante.area
                                },
                                geometry: {
                                    type: 'Polygon',
                                    coordinates: [cuadrante.coordinates]
                                }
                            }))
                        }
                    })

                    // Agregar capa de relleno
                    map.current.addLayer({
                        id: 'cuadrantes-fill',
                        type: 'fill',
                        source: 'cuadrantes',
                        paint: {
                            'fill-color': [
                                'case',
                                ['>=', ['get', 'idc'], 0.60], '#1e40af', // Azul oscuro - Alto
                                ['>=', ['get', 'idc'], 0.50], '#fbbf24', // Amarillo - Medio
                                '#d97706' // Naranja oscuro - Bajo
                            ],
                            'fill-opacity': 0.8
                        }
                    })

                    // Agregar capa de borde
                    map.current.addLayer({
                        id: 'cuadrantes-border',
                        type: 'line',
                        source: 'cuadrantes',
                        paint: {
                            'line-color': '#ffffff',
                            'line-width': 2
                        }
                    })

                    // Agregar interactividad
                    map.current.on('click', 'cuadrantes-fill', (e) => {
                        if (e.features && e.features[0] && e.features[0].properties) {
                            const feature = e.features[0]
                            const properties = feature.properties

                            if (map.current && properties &&
                                typeof properties.name === 'string' &&
                                typeof properties.idc === 'number' &&
                                typeof properties.poblacion === 'number' &&
                                typeof properties.area === 'string') {

                                new mapboxgl.Popup()
                                    .setLngLat(e.lngLat)
                                    .setHTML(`
                                        <div style="padding: 12px; min-width: 200px;">
                                            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${properties.name}</h3>
                                            <div style="margin-bottom: 8px;">
                                                <p style="margin: 0; color: #666; font-size: 14px;">
                                                    <strong>IDC:</strong> ${properties.idc}
                                                </p>
                                                <p style="margin: 0; color: #666; font-size: 14px;">
                                                    <strong>Población:</strong> ${properties.poblacion.toLocaleString()}
                                                </p>
                                                <p style="margin: 0; color: #666; font-size: 14px;">
                                                    <strong>Área:</strong> ${properties.area}
                                                </p>
                                            </div>
                                            <div style="padding: 4px 8px; background: ${getColorByIDC(properties.idc)}; color: white; border-radius: 4px; font-size: 12px; text-align: center;">
                                                ${getIDCLevel(properties.idc).toUpperCase()} IDC
                                            </div>
                                        </div>
                                    `)
                                    .addTo(map.current)
                            }
                        }
                    })

                    // Cambiar cursor al hacer hover
                    map.current.on('mouseenter', 'cuadrantes-fill', () => {
                        if (map.current) {
                            map.current.getCanvas().style.cursor = 'pointer'
                        }
                    })

                    map.current.on('mouseleave', 'cuadrantes-fill', () => {
                        if (map.current) {
                            map.current.getCanvas().style.cursor = ''
                        }
                    })

                    // Centrar el mapa en La Florida solo si no hay filtros aplicados o si es la primera carga
                    if (!map.current.getCenter() ||
                        (map.current.getCenter().lng === -70.6483 && map.current.getCenter().lat === -33.4489)) {
                        map.current.flyTo({
                            center: [-70.568, -33.527],
                            zoom: 14
                        })
                    }
                }
            } else {
                // Mostrar marcadores de comunas como antes
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
                    const idcLevel = getIDCLevel(comuna.idc)
                    const showByIDC =
                        (idcLevel === 'alto' && filters?.showAlto !== false) ||
                        (idcLevel === 'medio' && filters?.showMedio !== false) ||
                        (idcLevel === 'bajo' && filters?.showBajo !== false)

                    const showByRegion = !filters?.region || filters.region === "all" || comunas.some(c => c.region === filters.region)
                    const showByComuna = !filters?.comuna || filters.comuna === "all" || comunas.some(c => c.name === filters.comuna)

                    return showByIDC && showByRegion && showByComuna
                })

                comunasFiltradas.forEach(comuna => {
                    const el = document.createElement("div")
                    el.className = "marker"
                    el.style.width = "20px"
                    el.style.height = "20px"
                    el.style.borderRadius = "50%"
                    el.style.backgroundColor = getColorByIDC(comuna.idc)
                    el.style.border = "2px solid white"
                    el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)"
                    el.style.cursor = "pointer"

                    if (map.current) {
                        new mapboxgl.Marker(el)
                            .setLngLat([comuna.lng, comunas.lat])
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
            }
        }

        // Verificar si el estilo ya está cargado
        if (map.current && map.current.isStyleLoaded()) {
            addLayersAfterStyleLoad()
        } else if (map.current) {
            // Esperar a que el estilo se cargue
            map.current.on('style.load', addLayersAfterStyleLoad)
        }
    }, [filters])

    const getColorByIDC = (idc: number) => {
        if (idc >= 0.60) return "#1e40af" // Azul oscuro - Alto
        if (idc >= 0.50) return "#fbbf24" // Amarillo - Medio
        return "#d97706" // Naranja oscuro - Bajo
    }

    const getIDCLevel = (idc: number) => {
        if (idc >= 0.60) return "alto"
        if (idc >= 0.50) return "medio"
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
                        <p className="text-sm font-semibold text-gray-800 mb-3">Rangos BHT (Valor normalizado de 0 a 1)</p>
                        <div className="grid grid-cols-1 gap-2 text-xs">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-800 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Alto (0.60 - 1.00)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Medio (0.50 - 0.60)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-orange-600 rounded-full mr-2 shadow-sm"></div>
                                <span className="text-gray-700">Bajo (0.00 - 0.50)</span>
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
