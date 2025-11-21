// app/dashboard/inicio/page.tsx
'use client';

import { useSalesStore } from '@/lib/store/salesStore';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Users,
  XCircle 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useMemo } from 'react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function InicioPage() {
  const sales = useSalesStore((state) => state.sales);

  const stats = useMemo(() => {
    const pendientes = sales.filter(s => s.estado === 'pendiente').length;
    const aprobadas = sales.filter(s => s.estado === 'aprobada').length;
    const anuladas = sales.filter(s => s.estado === 'anulada').length;
    
    return {
      total: sales.length,
      pendientes,
      aprobadas,
      anuladas,
    };
  }, [sales]);

  const asesores = useMemo(() => {
    const asesorMap = new Map<string, { total: number; aprobadas: number; pendientes: number }>();
    
    sales.forEach(sale => {
      if (!asesorMap.has(sale.asesor)) {
        asesorMap.set(sale.asesor, { total: 0, aprobadas: 0, pendientes: 0 });
      }
      const asesorData = asesorMap.get(sale.asesor)!;
      asesorData.total++;
      if (sale.estado === 'aprobada') asesorData.aprobadas++;
      if (sale.estado === 'pendiente') asesorData.pendientes++;
    });

    return Array.from(asesorMap.entries()).map(([nombre, data]) => ({
      nombre,
      ...data,
    }));
  }, [sales]);

  const pieData = [
    { name: 'Aprobadas', value: stats.aprobadas },
    { name: 'Pendientes', value: stats.pendientes },
    { name: 'Anuladas', value: stats.anuladas },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido al Sistema de Ventas</h1>
        <p className="text-muted-foreground mt-2">
          Aquí tienes un resumen general de las ventas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ventas Totales"
          value={stats.total}
          icon={TrendingUp}
          description="Total de ventas registradas"
        />
        <StatsCard
          title="Pendientes de Aprobar"
          value={stats.pendientes}
          icon={AlertCircle}
          description="Requieren revisión"
        />
        <StatsCard
          title="Ventas Aprobadas"
          value={stats.aprobadas}
          icon={CheckCircle2}
          description="Ventas confirmadas"
        />
        <StatsCard
          title="Ventas Anuladas"
          value={stats.anuladas}
          icon={XCircle}
          description="Ventas canceladas"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart - Ventas por Asesor */}
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Asesor</CardTitle>
            <CardDescription>Distribución de ventas entre asesores</CardDescription>
          </CardHeader>
          <CardContent>
            {asesores.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={asesores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nombre" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total" />
                  <Bar dataKey="aprobadas" fill="#10b981" name="Aprobadas" />
                  <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart - Estado de Ventas */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Ventas</CardTitle>
            <CardDescription>Distribución por estado</CardDescription>
          </CardHeader>
          <CardContent>
            {sales.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No hay datos disponibles
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lista de Asesores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de Asesores
          </CardTitle>
          <CardDescription>Resumen de ventas por asesor</CardDescription>
        </CardHeader>
        <CardContent>
          {asesores.length > 0 ? (
            <div className="space-y-4">
              {asesores.map((asesor) => (
                <div key={asesor.nombre} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{asesor.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {asesor.total} ventas totales
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-green-600">{asesor.aprobadas}</p>
                      <p className="text-muted-foreground">Aprobadas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-orange-600">{asesor.pendientes}</p>
                      <p className="text-muted-foreground">Pendientes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay asesores registrados aún
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
