// app/dashboard/ventas/subir/page.tsx
'use client';

import { useState } from 'react';
import { useSalesStore } from '@/lib/store/salesStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { fileToBase64, formatDate } from '@/lib/utils';
import { SaleType } from '@/lib/types';

export default function SubirPage() {
  const { addSale, getPendingSales } = useSalesStore();
  const pendingSales = getPendingSales();

  const [formData, setFormData] = useState({
    asesor: '',
    fecha: new Date().toISOString().split('T')[0],
    dniCliente: '',
    nombreCliente: '',
    apellidoCliente: '',
    direccion: '',
    ubicacion: '',
    tipoVenta: 'empotrada' as SaleType,
    observacion: '',
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const base64 = await fileToBase64(file);
      setPdfBase64(base64);
    } else {
      alert('Por favor, selecciona un archivo PDF válido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulamos un pequeño delay
    setTimeout(() => {
      addSale({
        ...formData,
        estado: 'pendiente',
        pdfUrl: pdfBase64,
        pdfName: pdfFile?.name,
      });

      // Reset form
      setFormData({
        asesor: '',
        fecha: new Date().toISOString().split('T')[0],
        dniCliente: '',
        nombreCliente: '',
        apellidoCliente: '',
        direccion: '',
        ubicacion: '',
        tipoVenta: 'empotrada',
        observacion: '',
      });
      setPdfFile(null);
      setPdfBase64('');
      setLoading(false);
      setSuccess(true);

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subir Nueva Venta</h1>
        <p className="text-muted-foreground mt-2">
          Completa el formulario para registrar una nueva venta
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="rounded-lg bg-green-50 p-4 flex items-center gap-3 border border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-green-800 font-medium">¡Venta registrada exitosamente!</p>
        </div>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Formulario de Venta</CardTitle>
          <CardDescription>Ingresa los datos de la venta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="asesor">Nombre del Asesor *</Label>
                <Input
                  id="asesor"
                  name="asesor"
                  value={formData.asesor}
                  onChange={handleInputChange}
                  required
                  placeholder="Ingresa el nombre del asesor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Venta *</Label>
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dniCliente">DNI del Cliente *</Label>
                <Input
                  id="dniCliente"
                  name="dniCliente"
                  value={formData.dniCliente}
                  onChange={handleInputChange}
                  required
                  placeholder="12345678"
                  maxLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombreCliente">Nombre del Cliente *</Label>
                <Input
                  id="nombreCliente"
                  name="nombreCliente"
                  value={formData.nombreCliente}
                  onChange={handleInputChange}
                  required
                  placeholder="Nombre"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellidoCliente">Apellido del Cliente *</Label>
                <Input
                  id="apellidoCliente"
                  name="apellidoCliente"
                  value={formData.apellidoCliente}
                  onChange={handleInputChange}
                  required
                  placeholder="Apellido"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoVenta">Tipo de Venta *</Label>
                <Select
                  id="tipoVenta"
                  name="tipoVenta"
                  value={formData.tipoVenta}
                  onChange={handleInputChange}
                  required
                >
                  <option value="empotrada">Empotrada</option>
                  <option value="a la vista">A la Vista</option>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="direccion">Dirección del Cliente *</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                  placeholder="Av. Principal 123"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ubicacion">Ubicación del Domicilio *</Label>
                <Input
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  required
                  placeholder="Distrito, Provincia"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacion">Observación</Label>
                <Textarea
                  id="observacion"
                  name="observacion"
                  value={formData.observacion}
                  onChange={handleInputChange}
                  placeholder="Notas adicionales sobre la venta..."
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pdf">Archivo PDF</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {pdfFile && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {pdfFile.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? 'Registrando...' : 'Registrar Venta'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Pending Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ventas Pendientes de Aprobación</CardTitle>
          <CardDescription>
            {pendingSales.length} venta(s) pendiente(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingSales.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Asesor</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSales.slice(0, 5).map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{formatDate(sale.fecha)}</TableCell>
                    <TableCell>{sale.asesor}</TableCell>
                    <TableCell>{`${sale.nombreCliente} ${sale.apellidoCliente}`}</TableCell>
                    <TableCell>{sale.dniCliente}</TableCell>
                    <TableCell className="capitalize">{sale.tipoVenta}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                        Pendiente
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay ventas pendientes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
