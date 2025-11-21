// app/dashboard/ventas/todo/page.tsx
'use client';

import { useState } from 'react';
import { useSalesStore } from '@/lib/store/salesStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function TodoPage() {
  const { sales, deleteSale } = useSalesStore();

  const handleDelete = (id: string, clientName: string) => {
    if (confirm(`¿Eliminar la venta de ${clientName}?`)) {
      deleteSale(id);
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
      alert('No hay PDF disponible');
    }
  };

  const sortedSales = [...sales].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Todas las Ventas</h1>
        <p className="text-muted-foreground mt-2">
          Vista completa de todas las ventas registradas en el sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión Completa de Ventas</CardTitle>
          <CardDescription>
            {sales.length} venta(s) registrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sales.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-mono text-xs">{sale.id.slice(0, 8)}...</TableCell>
                      <TableCell>{formatDate(sale.fecha)}</TableCell>
                      <TableCell>{sale.asesor}</TableCell>
                      <TableCell>{`${sale.nombreCliente} ${sale.apellidoCliente}`}</TableCell>
                      <TableCell>{sale.dniCliente}</TableCell>
                      <TableCell className="max-w-xs truncate">{sale.direccion}</TableCell>
                      <TableCell className="capitalize">{sale.tipoVenta}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            sale.estado === 'aprobada'
                              ? 'bg-green-100 text-green-800'
                              : sale.estado === 'pendiente'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {sale.estado.charAt(0).toUpperCase() + sale.estado.slice(1)}
                        </span>
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
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(sale.id, `${sale.nombreCliente} ${sale.apellidoCliente}`)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No hay ventas registradas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
