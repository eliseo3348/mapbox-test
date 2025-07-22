"use client"

import { useState } from "react"
import {
  Upload,
  BarChart3,
  Globe,
  FileText,
  Users,
  Bell,
  User,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Check,
  AlertTriangle,
  Filter,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Datos de ejemplo
const sampleData = [
  ["Comuna", "Población", "IDC", "Dimensión Social", "Dimensión Territorial"],
  ["Santiago", "85000", "0.75", "0.72", "0.78"],
  ["Providencia", "45000", "0.82", "0.85", "0.79"],
  ["Las Condes", "62000", "0.88", "0.90", "0.86"],
  ["Maipú", "120000", "0.65", "0.68", "0.62"],
]

const visualizaciones = [
  { id: 1, nombre: "IDC Región Metropolitana", fecha: "2024-01-15", estado: "Activo", tipo: "Mapa" },
  { id: 2, nombre: "Comparativo Comunas", fecha: "2024-01-10", estado: "Borrador", tipo: "Gráfico" },
  { id: 3, nombre: "Evolución Temporal IDC", fecha: "2024-01-05", estado: "Activo", tipo: "Línea" },
]

const logs = [
  { fecha: "2024-01-15 14:30", usuario: "admin@udla.cl", accion: "Carga de datos", resultado: "Exitoso" },
  { fecha: "2024-01-15 12:15", usuario: "coord@udla.cl", accion: "Publicación", resultado: "Exitoso" },
  { fecha: "2024-01-14 16:45", usuario: "admin@udla.cl", accion: "Eliminación", resultado: "Error" },
]

const usuarios = [
  { id: 1, nombre: "Juan Pérez", correo: "juan.perez@udla.cl", rol: "Administrador", estado: "Activo" },
  { id: 2, nombre: "María González", correo: "maria.gonzalez@udla.cl", rol: "Coordinador", estado: "Activo" },
  { id: 3, nombre: "Carlos Silva", correo: "carlos.silva@udla.cl", rol: "Coordinador", estado: "Inactivo" },
]

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState("carga-datos")
  const [uploadMessage, setUploadMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [datasetType, setDatasetType] = useState("")
  const [showUserModal, setShowUserModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { id: "carga-datos", label: "Carga de datos", icon: Upload },
    { id: "visualizaciones", label: "Visualizaciones", icon: BarChart3 },
    { id: "publicacion", label: "Publicación", icon: Globe },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "usuarios", label: "Usuarios", icon: Users },
  ]

  const handleFileUpload = () => {
    if (!selectedFile || !datasetType) {
      setUploadMessage("Por favor selecciona un archivo y tipo de dataset")
      return
    }
    setUploadMessage("Archivo subido exitosamente")
    setTimeout(() => setUploadMessage(""), 3000)
  }

  const renderCargaDatos = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Carga de Datos</h1>
        <p className="text-gray-600">Sube archivos Excel con datos del observatorio</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subir Archivo</CardTitle>
          <CardDescription>Selecciona el tipo de dataset y el archivo Excel correspondiente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataset-type">Tipo de Dataset</Label>
              <Select value={datasetType} onValueChange={setDatasetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linea-base">Línea Base</SelectItem>
                  <SelectItem value="linea-salida">Línea de Salida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="file-upload">Archivo Excel</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <Button onClick={handleFileUpload} className="bg-orange-500 hover:bg-orange-600">
            <Upload className="w-4 h-4 mr-2" />
            Subir Archivo
          </Button>
        </CardContent>
      </Card>

      {uploadMessage && (
        <Alert
          className={
            uploadMessage.includes("exitosamente") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
          }
        >
          <AlertDescription className={uploadMessage.includes("exitosamente") ? "text-green-800" : "text-red-800"}>
            {uploadMessage}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vista Previa de Datos</CardTitle>
          <CardDescription>Primeras 5 filas del archivo cargado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {sampleData[0].map((header, index) => (
                    <TableHead key={index} className="font-semibold">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderVisualizaciones = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Visualizaciones</h1>
          <p className="text-gray-600">Gestiona las visualizaciones del observatorio</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Visualización
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="borrador">Borrador</SelectItem>
                <SelectItem value="archivado">Archivado</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mapa">Mapa</SelectItem>
                <SelectItem value="grafico">Gráfico</SelectItem>
                <SelectItem value="linea">Línea</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Visualizaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha de Carga</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visualizaciones.map((viz) => (
                <TableRow key={viz.id}>
                  <TableCell className="font-medium">{viz.nombre}</TableCell>
                  <TableCell>{viz.fecha}</TableCell>
                  <TableCell>
                    <Badge
                      variant={viz.estado === "Activo" ? "default" : "secondary"}
                      className={viz.estado === "Activo" ? "bg-green-500" : ""}
                    >
                      {viz.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{viz.tipo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderPublicacion = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Publicación</h1>
        <p className="text-gray-600">Revisa y aprueba visualizaciones antes de publicarlas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa</CardTitle>
            <CardDescription>IDC Región Metropolitana - Mapa Interactivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-orange-50 to-gray-50 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-600">Vista previa de visualización</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Validación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Datos completos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Formato correcto</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">Revisar metadatos</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label htmlFor="comments">Comentarios de revisión</Label>
              <Textarea id="comments" placeholder="Agregar comentarios sobre la visualización..." />
            </div>

            <div className="flex space-x-3">
              <Button className="bg-orange-500 hover:bg-orange-600 flex-1">
                <Globe className="w-4 h-4 mr-2" />
                Publicar Visualización
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Solicitar Corrección
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderLogs = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Logs del Sistema</h1>
        <p className="text-gray-600">Historial de acciones realizadas en el sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="Buscar usuario..." />
            <Input type="date" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carga">Carga de datos</SelectItem>
                <SelectItem value="publicacion">Publicación</SelectItem>
                <SelectItem value="eliminacion">Eliminación</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Historial de Actividades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Resultado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.fecha}</TableCell>
                  <TableCell>{log.usuario}</TableCell>
                  <TableCell>{log.accion}</TableCell>
                  <TableCell>
                    <Badge
                      variant={log.resultado === "Exitoso" ? "default" : "destructive"}
                      className={log.resultado === "Exitoso" ? "bg-green-500" : ""}
                    >
                      {log.resultado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsuarios = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra usuarios y asigna roles</p>
        </div>
        <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
              <DialogDescription>Completa la información del nuevo usuario</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" placeholder="Juan Pérez" />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="juan.perez@udla.cl" />
              </div>
              <div>
                <Label htmlFor="role">Rol</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="coord">Coordinador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-orange-500 hover:bg-orange-600 flex-1">Guardar</Button>
                <Button variant="outline" onClick={() => setShowUserModal(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">{usuario.nombre}</TableCell>
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      {usuario.rol}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={usuario.estado === "Activo" ? "default" : "secondary"}
                      className={usuario.estado === "Activo" ? "bg-green-500" : ""}
                    >
                      {usuario.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "carga-datos":
        return renderCargaDatos()
      case "visualizaciones":
        return renderVisualizaciones()
      case "publicacion":
        return renderPublicacion()
      case "logs":
        return renderLogs()
      case "usuarios":
        return renderUsuarios()
      default:
        return renderCargaDatos()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Columna Izquierda */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm flex-shrink-0 hidden lg:flex lg:flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Observatorio</h2>
              <p className="text-xs text-gray-600">Panel Admin</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 flex-1">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navegación</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                  currentPage === item.id
                    ? "bg-orange-100 text-orange-700 border border-orange-200"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg lg:hidden">
            {/* Mobile Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">Observatorio</h2>
                  <p className="text-xs text-gray-600">Panel Admin</p>
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Navigation */}
            <nav className="p-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navegación</p>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setSidebarOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                      currentPage === item.id
                        ? "bg-orange-100 text-orange-700 border border-orange-200"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Main Content - Columna Derecha */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Panel de Administración</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{renderCurrentPage()}</main>
      </div>
    </div>
  )
}
