
import { useState } from "react";
import { Search, Smartphone, Laptop, Headphones, Tablet, Gamepad2, Watch, Monitor, ArrowRight, Shield, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [repairId, setRepairId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!repairId.trim()) {
      toast({
        title: "ID requerido",
        description: "Por favor ingresa tu ID de reparación",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate ID validation - in real app this would check against database
    if (repairId.length < 6) {
      toast({
        title: "ID inválido",
        description: "El ID debe tener al menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/tracking/${repairId}`);
  };

  const services = [
    { icon: Smartphone, name: "Smartphones", count: "150+ reparados" },
    { icon: Laptop, name: "Laptops", count: "200+ reparados" },
    { icon: Tablet, name: "Tablets", count: "80+ reparados" },
    { icon: Headphones, name: "Audífonos", count: "120+ reparados" },
    { icon: Gamepad2, name: "Consolas", count: "90+ reparados" },
    { icon: Watch, name: "Smartwatches", count: "60+ reparados" },
    { icon: Monitor, name: "Monitores", count: "70+ reparados" }
  ];

  const stats = [
    { icon: Shield, label: "Garantía", value: "6 meses" },
    { icon: Clock, label: "Tiempo promedio", value: "5-7 días" },
    { icon: Star, label: "Satisfacción", value: "98%" },
    { icon: Users, label: "Clientes felices", value: "2,500+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  GadgetZone
                </h1>
                <p className="text-sm text-gray-600">Centro de Reparaciones</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
              ✓ Servicio Certificado
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Rastrea tu dispositivo en
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> tiempo real</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Mantente informado sobre cada paso del proceso de reparación de tu dispositivo con nuestra plataforma avanzada de seguimiento
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto mb-16">
            <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Ingresa tu ID de reparación"
                      value={repairId}
                      onChange={(e) => setRepairId(e.target.value)}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Consultar Estado
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Demo Link */}
          <div className="mb-12">
            <p className="text-gray-600 mb-4">¿Quieres ver una demostración?</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/tracking/DEMO123456')}
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Ver Demo con ID: DEMO123456
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Dispositivos que Reparamos</h3>
          <p className="text-gray-600 mb-8">Especialistas en toda clase de gadgets y dispositivos electrónicos</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold">GadgetZone</h4>
              </div>
              <p className="text-gray-300">Tu centro de confianza para reparaciones de dispositivos electrónicos.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contacto</h5>
              <p className="text-gray-300 mb-2">📞 +1 (555) 123-4567</p>
              <p className="text-gray-300 mb-2">📧 info@gadgetzone.com</p>
              <p className="text-gray-300">📍 123 Tech Street, Silicon Valley</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Horarios</h5>
              <p className="text-gray-300 mb-2">Lun - Vie: 9:00 AM - 7:00 PM</p>
              <p className="text-gray-300 mb-2">Sábado: 10:00 AM - 5:00 PM</p>
              <p className="text-gray-300">Domingo: Cerrado</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 GadgetZone. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
