// app/dashboard/ventas/anuladas/page.tsx
'use client';

import { useSalesStore } from '@/lib/store/salesStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AnuladasPage() {
  const { getAnnulledSales } = useSalesStore();
  const annulledSales = getAnnulledSales();

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

  const sortedSales = [...annulledSales].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ventas Anuladas</h1>
        <p className="text-muted-foreground mt-2">
          Historial de ventas que han sido anuladas
        </p>
      </div>

      {annulledSales.length > 0 && (
        <div className="rounded-lg bg-red-50 p-4 flex items-start gap-3 border border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Ventas Anuladas</h3>
            <p className="text-sm text-red-700 mt-1">
              Estas ventas han sido canceladas y ya no están activas en el sistema.
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ventas Anuladas</CardTitle>
          <CardDescription>
            {annulledSales.length} venta(s) anulada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {annulledSales.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha Original</TableHead>
                    <TableHead>Fecha Anulación</TableHead>
                    <TableHead>Asesor</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Observación</TableHead>
                    <TableHead>PDF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSales.map((sale) => (
                    <TableRow key={sale.id} className="opacity-70">
                      <TableCell>{formatDate(sale.fecha)}</TableCell>
                      <TableCell>{formatDate(sale.updatedAt)}</TableCell>
                      <TableCell>{sale.asesor}</TableCell>
                      <TableCell>{`${sale.nombreCliente} ${sale.apellidoCliente}`}</TableCell>
                      <TableCell>{sale.dniCliente}</TableCell>
                      <TableCell className="capitalize">{sale.tipoVenta}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {sale.observacion || 'Sin observaciones'}
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No hay ventas anuladas</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
