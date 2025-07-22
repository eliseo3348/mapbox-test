"use client"

import { useState } from "react"
import { BarChart3, MapPin, Users, TrendingUp, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MapComponent from "../../map"

export default function MapLayoutPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: BarChart3, active: false },
        { id: "map", label: "Mapa", icon: MapPin, active: true },
        { id: "users", label: "Usuarios", icon: Users, active: false },
        { id: "analytics", label: "Analytics", icon: TrendingUp, active: false },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo y título */}
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="lg:hidden"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>

                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">Observatorio UDLA</h1>
                                    <p className="text-sm text-gray-600">Mapa Interactivo</p>
                                </div>
                            </div>
                        </div>

                        {/* Acciones del header */}
                        <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="border-green-200 text-green-700">
                                Conectado
                            </Badge>
                            <Button size="sm" variant="outline">
                                Ayuda
                            </Button>
                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                Salir
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>
                    <div className="p-4">
                        <nav className="space-y-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Navegación
                            </p>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={item.active ? "default" : "ghost"}
                                    className={`w-full justify-start ${item.active
                                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                                            : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Button>
                            ))}
                        </nav>

                        {/* Información del mapa */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Información del Mapa</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Comunas:</span>
                                    <span className="text-gray-800">6</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">IDC Promedio:</span>
                                    <span className="text-gray-800">0.71</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Última actualización:</span>
                                    <span className="text-gray-800">Hace 5 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay para móvil */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Contenido principal */}
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="mb-6">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-2">
                                    <li>
                                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                            Inicio
                                        </Button>
                                    </li>
                                    <li className="text-gray-400">/</li>
                                    <li>
                                        <span className="text-gray-900 font-medium">Mapa</span>
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* Título de la página */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mapa Interactivo</h2>
                            <p className="text-gray-600">Explora la distribución geográfica del IDC por regiones y comunas</p>
                        </div>

                        {/* Mapa principal */}
                        <div className="mb-8">
                            <MapComponent />
                        </div>

                        {/* Estadísticas adicionales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="border-orange-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-lg">
                                        <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                                        Cobertura Territorial
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
                                    <p className="text-sm text-gray-600">Comunas en el mapa</p>
                                </CardContent>
                            </Card>

                            <Card className="border-orange-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-lg">
                                        <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                                        IDC Promedio
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">0.71</div>
                                    <p className="text-sm text-gray-600">Valor promedio</p>
                                </CardContent>
                            </Card>

                            <Card className="border-orange-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-lg">
                                        <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                                        Tendencias
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-orange-600 mb-2">+5.2%</div>
                                    <p className="text-sm text-gray-600">Crecimiento anual</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
} 