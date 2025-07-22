"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Settings, Home, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navigation() {
    const pathname = usePathname()

    const navigationItems = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: BarChart3,
        },
        {
            href: "/map",
            label: "Mapa",
            icon: MapPin,
        },
        {
            href: "/admin-panel",
            label: "Admin Panel",
            icon: Settings,
        },
    ]

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800">Observatorio UDLA</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={pathname === item.href ? "default" : "ghost"}
                                        size="sm"
                                        className={cn(
                                            "flex items-center space-x-2",
                                            pathname === item.href
                                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                                : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                        Ayuda
                    </Button>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Ingresar
                    </Button>
                </div>
            </div>
        </nav>
    )
} 