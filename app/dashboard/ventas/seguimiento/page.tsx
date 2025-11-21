// app/dashboard/ventas/seguimiento/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useSalesStore } from '@/lib/store/salesStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Edit2, XCircle, CheckCircle, Save, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Sale, SaleStatus } from '@/lib/types';

export default function SeguimientoPage() {
  const { sales, updateSale, updateMultipleSalesStatus } = useSalesStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Sale>>({});
  const [filterStatus, setFilterStatus] = useState<'all' | SaleStatus>('all');

  // Filtrar ventas no anuladas
  const activeSales = useMemo(() => {
    let filtered = sales.filter(s => s.estado !== 'anulada');
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.estado === filterStatus);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [sales, filterStatus]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(activeSales.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleBulkApprove = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`¿Aprobar ${selectedIds.length} venta(s)?`)) {
      updateMultipleSalesStatus(selectedIds, 'aprobada');
      setSelectedIds([]);
    }
  };

  const handleBulkAnnul = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`¿Anular ${selectedIds.length} venta(s)?`)) {
      updateMultipleSalesStatus(selectedIds, 'anulada');
      setSelectedIds([]);
    }
  };

  const startEdit = (sale: Sale) => {
    setEditingId(sale.id);
    setEditData(sale);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = () => {
    if (editingId) {
      updateSale(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const viewPdf = (pdfUrl?: string) => {
    if (pdfUrl) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Vista PDF</title></head>
            <body style="margin:0">
              <embed width="100%" height="100%" src="${pdfUrl}" type="application/pdf">
            </body>
          </html>
        `);
      }
    } else {
      alert('No hay PDF disponible para esta venta');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seguimiento de Ventas</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona y actualiza el estado de las ventas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | SaleStatus)}
          >
            <option value="all">Todos</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobada">Aprobadas</option>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedIds.length} venta(s) seleccionada(s)
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBulkApprove}
                  className="text-green-600 hover:text-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Aprobar Seleccionadas
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBulkAnnul}
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Anular Seleccionadas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ventas</CardTitle>
          <CardDescription>
            {activeSales.length} venta(s) activa(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeSales.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === activeSales.length && activeSales.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="h-4 w-4 cursor-pointer"
                      />
                    </TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSales.map((sale) => {
                    const isEditing = editingId === sale.id;
                    const isSelected = selectedIds.includes(sale.id);

                    return (
                      <TableRow key={sale.id} className={isSelected ? 'bg-muted/50' : ''}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleSelectOne(sale.id, e.target.checked)}
                            className="h-4 w-4 cursor-pointer"
                          />
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <Input
                              type="date"
                              value={editData.fecha || ''}
                              onChange={(e) => setEditData({ ...editData, fecha: e.target.value })}
                              className="w-36"
                            />
                          ) : (
                            formatDate(sale.fecha)
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <Input
                              value={editData.asesor || ''}
                              onChange={(e) => setEditData({ ...editData, asesor: e.target.value })}
                              className="w-32"
                            />
                          ) : (
                            sale.asesor
                          )}
                        </TableCell>
                        <TableCell>
                          {`${sale.nombreCliente} ${sale.apellidoCliente}`}
                        </TableCell>
                        <TableCell>{sale.dniCliente}</TableCell>
                        <TableCell className="capitalize">{sale.tipoVenta}</TableCell>
                        <TableCell>
                          {isEditing ? (
                            <Select
                              value={editData.estado || sale.estado}
                              onChange={(e) => setEditData({ ...editData, estado: e.target.value as SaleStatus })}
                              className="w-32"
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="aprobada">Aprobada</option>
                            </Select>
                          ) : (
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                sale.estado === 'aprobada'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {sale.estado === 'aprobada' ? 'Aprobada' : 'Pendiente'}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {sale.pdfUrl ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => viewPdf(sale.pdfUrl)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {isEditing ? (
                            <div className="flex justify-end gap-1">
                              <Button size="sm" variant="ghost" onClick={saveEdit}>
                                <Save className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={cancelEdit}>
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(sale)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No hay ventas para mostrar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
