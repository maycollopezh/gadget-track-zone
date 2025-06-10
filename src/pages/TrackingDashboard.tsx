
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Phone, Mail, MapPin, MessageSquare, Camera, Download, Star, Clock, CheckCircle, AlertCircle, Wrench, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const TrackingDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from an API
  const mockData = {
    device: {
      type: "iPhone 14 Pro",
      brand: "Apple",
      model: "A2890",
      color: "Deep Purple",
      storage: "256GB",
      imei: "358240051111110",
      issue: "Pantalla rota y batería defectuosa",
      received: "2024-05-28",
      estimatedDelivery: "2024-06-05",
      cost: "$299.99",
      warranty: "6 meses"
    },
    customer: {
      name: "María González",
      email: "maria.gonzalez@gmail.com",
      phone: "+591 12345678",
      address: "El Alto, La Paz"
    },
    status: {
      current: "En Reparación",
      progress: 65,
      stage: 3,
      totalStages: 5
    },
    timeline: [
      {
        date: "2025-05-28",
        time: "10:30 AM",
        status: "Recibido",
        description: "Dispositivo recibido y registrado en el sistema",
        technician: "Carlos Ruiz",
        completed: true
      },
      {
        date: "2025-05-29",
        time: "2:15 PM",
        status: "Diagnóstico",
        description: "Diagnóstico completo realizado. Pantalla y batería requieren reemplazo",
        technician: "Ana López",
        completed: true
      },
      {
        date: "2025-05-30",
        time: "11:45 AM",
        status: "En Reparación",
        description: "Iniciado reemplazo de pantalla OLED. Proceso en curso",
        technician: "Miguel Torres",
        completed: false,
        current: true
      },
      {
        date: "2025-06-03",
        time: "Estimado",
        status: "Pruebas",
        description: "Pruebas de calidad y funcionamiento",
        technician: "Ana López",
        completed: false
      },
      {
        date: "2025-06-05",
        time: "Estimado",
        status: "Listo",
        description: "Dispositivo listo para entrega",
        technician: "Carlos Ruiz",
        completed: false
      }
    ],
    photos: [
      { id: 1, url: "/api/placeholder/300/200", description: "Estado inicial del dispositivo", date: "2025-05-28" },
      { id: 2, url: "/api/placeholder/300/200", description: "Daño en pantalla - Vista frontal", date: "2025-05-28" },
      { id: 3, url: "/api/placeholder/300/200", description: "Proceso de desmontaje", date: "2025-05-30" },
      { id: 4, url: "/api/placeholder/300/200", description: "Instalación de nueva pantalla", date: "2025-05-30" }
    ],
    history: [
      {
        date: "2024-11-15",
        issue: "Cambio de batería",
        cost: "$89.99",
        technician: "Carlos Ruiz",
        status: "Completado"
      },
      {
        date: "2024-08-22",
        issue: "Limpieza de puerto de carga",
        cost: "$29.99",
        technician: "Ana López",
        status: "Completado"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string, completed: boolean, current: boolean) => {
    if (completed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (current) return <Clock className="w-5 h-5 text-blue-500" />;
    return <AlertCircle className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'recibido': return 'bg-blue-100 text-blue-800';
      case 'diagnóstico': return 'bg-yellow-100 text-yellow-800';
      case 'en reparación': return 'bg-orange-100 text-orange-800';
      case 'pruebas': return 'bg-purple-100 text-purple-800';
      case 'listo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando información del dispositivo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Seguimiento de Reparación</h1>
                <p className="text-sm text-gray-600">ID: {id}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(mockData.status.current)} border-0`}>
              {mockData.status.current}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Estado Actual</span>
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-semibold text-blue-600">{mockData.status.progress}%</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={mockData.status.progress} className="mb-4 h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Recibido</p>
                <p className="font-semibold">{mockData.device.received}</p>
              </div>
              <div className="text-center">
                <Wrench className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">En Proceso</p>
                <p className="font-semibold">Día 3 de 8</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Entrega Estimada</p>
                <p className="font-semibold">{mockData.device.estimatedDelivery}</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Garantía</p>
                <p className="font-semibold">{mockData.device.warranty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="device" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="device">Dispositivo</TabsTrigger>
            <TabsTrigger value="timeline">Progreso</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="customer">Cliente</TabsTrigger>
          </TabsList>

          {/* Device Info */}
          <TabsContent value="device">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Información del Dispositivo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Tipo</p>
                      <p className="font-semibold">{mockData.device.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Marca</p>
                      <p className="font-semibold">{mockData.device.brand}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Modelo</p>
                      <p className="font-semibold">{mockData.device.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Color</p>
                      <p className="font-semibold">{mockData.device.color}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Almacenamiento</p>
                      <p className="font-semibold">{mockData.device.storage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">IMEI</p>
                      <p className="font-semibold text-xs">{mockData.device.imei}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Problema Reportado</p>
                    <p className="font-semibold">{mockData.device.issue}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Detalles de Reparación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Costo Total</p>
                      <p className="text-2xl font-bold text-green-600">{mockData.device.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Garantía</p>
                      <p className="text-2xl font-bold text-blue-600">{mockData.device.warranty}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Historial Previo</h4>
                    {mockData.history.map((repair, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{repair.issue}</p>
                            <p className="text-sm text-gray-600">{repair.date} - {repair.technician}</p>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {repair.cost}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Progreso de Reparación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockData.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(item.status, item.completed, item.current)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{item.status}</h4>
                          <div className="text-sm text-gray-500">
                            {item.date} {item.time}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {item.technician.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">{item.technician}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos */}
          <TabsContent value="photos">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Galería del Proceso</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Todo
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockData.photos.map((photo) => (
                    <div key={photo.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
                        <img 
                          src={photo.url} 
                          alt={photo.description}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold text-sm">{photo.description}</p>
                        <p className="text-xs text-gray-600">{photo.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Info */}
          <TabsContent value="customer">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Información del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Nombre</p>
                      <p className="font-semibold">{mockData.customer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold">{mockData.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="font-semibold">{mockData.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Dirección</p>
                      <p className="font-semibold">{mockData.customer.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat con Técnico
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Recogida
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Reporte
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Calificar Servicio
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrackingDashboard;
