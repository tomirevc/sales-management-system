// app/dashboard/reportes/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useSalesStore } from '@/lib/store/salesStore';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, Calendar } from 'lucide-react';
import { generateSalesReport, generateAsesorReport, downloadReport } from '@/lib/utils/reportGenerator';
import { formatDate, getMonthRange, getQuincenaRange } from '@/lib/utils';

export default function ReportesPage() {
  const { sales } = useSalesStore();
  const [reportType, setReportType] = useState<'mensual' | 'quincenal'>('mensual');
  const [selectedAsesor, setSelectedAsesor] = useState<string>('all');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Get unique asesores
  const asesores = useMemo(() => {
    const uniqueAsesores = new Set(sales.map(s => s.asesor));
    return Array.from(uniqueAsesores);
  }, [sales]);

  // Apply filters
  const setDateRange = (type: 'mensual' | 'quincenal') => {
    setReportType(type);
    const today = new Date();
    let range;
    
    if (type === 'mensual') {
      range = getMonthRange(today);
    } else {
      range = getQuincenaRange(today);
    }
    
    setFechaInicio(range.start.toISOString().split('T')[0]);
    setFechaFin(range.end.toISOString().split('T')[0]);
  };

  const filteredSales = useMemo(() => {
    let filtered = sales;

    if (selectedAsesor !== 'all') {
      filtered = filtered.filter(s => s.asesor === selectedAsesor);
    }

    if (fechaInicio && fechaFin) {
      filtered = filtered.filter(s => {
        const saleDate = new Date(s.fecha);
        return saleDate >= new Date(fechaInicio) && saleDate <= new Date(fechaFin);
      });
    }

    return filtered;
  }, [sales, selectedAsesor, fechaInicio, fechaFin]);

  const stats = useMemo(() => {
    const pendientes = filteredSales.filter(s => s.estado === 'pendiente').length;
    const aprobadas = filteredSales.filter(s => s.estado === 'aprobada').length;
    const anuladas = filteredSales.filter(s => s.estado === 'anulada').length;

    return {
      total: filteredSales.length,
      pendientes,
      aprobadas,
      anuladas,
    };
  }, [filteredSales]);

  const asesorStats = useMemo(() => {
    const asesorMap = new Map<string, { total: number; aprobadas: number; pendientes: number }>();
    
    filteredSales.forEach(sale => {
      if (!asesorMap.has(sale.asesor)) {
        asesorMap.set(sale.asesor, { total: 0, aprobadas: 0, pendientes: 0 });
      }
      const data = asesorMap.get(sale.asesor)!;
      data.total++;
      if (sale.estado === 'aprobada') data.aprobadas++;
      if (sale.estado === 'pendiente') data.pendientes++;
    });

    return Array.from(asesorMap.entries()).map(([nombre, data]) => ({
      nombre,
      ventas: data.total,
      aprobadas: data.aprobadas,
      pendientes: data.pendientes,
    }));
  }, [filteredSales]);

  const handleDownloadReport = (type: 'total' | 'pendientes' | 'aprobadas' | 'asesor') => {
    let doc;
    let filename;

    switch (type) {
      case 'total':
        doc = generateSalesReport(filteredSales, 'Reporte de Ventas Totales', { fechaInicio, fechaFin });
        filename = `reporte-ventas-totales-${Date.now()}.pdf`;
        break;
      case 'pendientes':
        const pendientes = filteredSales.filter(s => s.estado === 'pendiente');
        doc = generateSalesReport(pendientes, 'Reporte de Ventas Pendientes', { fechaInicio, fechaFin });
        filename = `reporte-ventas-pendientes-${Date.now()}.pdf`;
        break;
      case 'aprobadas':
        const aprobadas = filteredSales.filter(s => s.estado === 'aprobada');
        doc = generateSalesReport(aprobadas, 'Reporte de Ventas Aprobadas', { fechaInicio, fechaFin });
        filename = `reporte-ventas-aprobadas-${Date.now()}.pdf`;
        break;
      case 'asesor':
        doc = generateAsesorReport(asesorStats);
        filename = `reporte-por-asesor-${Date.now()}.pdf`;
        break;
    }

    downloadReport(doc, filename);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <p className="text-muted-foreground mt-2">
          Genera y descarga reportes personalizados de ventas
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Reporte</CardTitle>
          <CardDescription>Configura los parámetros para tu reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Tipo de Reporte</Label>
              <div className="flex gap-2">
                <Button
                  variant={reportType === 'mensual' ? 'default' : 'outline'}
                  onClick={() => setDateRange('mensual')}
                  className="flex-1"
                >
                  Mensual
                </Button>
                <Button
                  variant={reportType === 'quincenal' ? 'default' : 'outline'}
                  onClick={() => setDateRange('quincenal')}
                  className="flex-1"
                >
                  Quincenal
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha Inicio</Label>
              <Input
                id="fechaInicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fechaFin">Fecha Fin</Label>
              <Input
                id="fechaFin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="asesor">Asesor</Label>
              <Select
                id="asesor"
                value={selectedAsesor}
                onChange={(e) => setSelectedAsesor(e.target.value)}
              >
                <option value="all">Todos los Asesores</option>
                {asesores.map((asesor) => (
                  <option key={asesor} value={asesor}>
                    {asesor}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sin Aprobar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendientes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.aprobadas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Anuladas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.anuladas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Ventas por Asesor</CardTitle>
          <CardDescription>Análisis de rendimiento por asesor</CardDescription>
        </CardHeader>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={asesorStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#3b82f6" name="Total" />
                <Bar dataKey="aprobadas" fill="#10b981" name="Aprobadas" />
                <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
              </BarChart>
            </ResponsiveContainer>
            <CardContent>
              {asesorStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={asesorStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventas" fill="#3b82f6" name="Total" />
                    <Bar dataKey="aprobadas" fill="#10b981" name="Aprobadas" />
                    <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                  No hay datos disponibles
                </div>
              )}
            </CardContent>
          </Card>

      {/* Download Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Descargar Reportes</CardTitle>
          <CardDescription>Genera y descarga reportes en formato PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDownloadReport('total')}
              disabled={filteredSales.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Ventas Totales
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDownloadReport('pendientes')}
              disabled={stats.pendientes === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Ventas Sin Aprobar
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDownloadReport('aprobadas')}
              disabled={stats.aprobadas === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Ventas Aprobadas
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleDownloadReport('asesor')}
              disabled={asesorStats.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar Reporte por Asesor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
