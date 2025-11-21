// lib/utils/reportGenerator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Sale, AsesorStats } from '@/lib/types';
import { formatDate } from './index';

export function generateSalesReport(
  sales: Sale[],
  title: string,
  filters?: { fechaInicio?: string; fechaFin?: string }
) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  
  doc.setFontSize(11);
  doc.text(`Generado: ${formatDate(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, 28);
  
  if (filters?.fechaInicio && filters?.fechaFin) {
    doc.text(
      `Período: ${formatDate(filters.fechaInicio)} - ${formatDate(filters.fechaFin)}`,
      14,
      34
    );
  }

  // Table
  const tableData = sales.map((sale) => [
    formatDate(sale.fecha),
    sale.asesor,
    sale.nombreCliente + ' ' + sale.apellidoCliente,
    sale.dniCliente,
    sale.tipoVenta,
    sale.estado,
  ]);

  autoTable(doc, {
    startY: filters?.fechaInicio ? 40 : 35,
    head: [['Fecha', 'Asesor', 'Cliente', 'DNI', 'Tipo', 'Estado']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 9 },
  });

  // Summary
  const finalY = (doc as any).lastAutoTable.finalY || 40;
  doc.setFontSize(12);
  doc.text(`Total de ventas: ${sales.length}`, 14, finalY + 10);

  return doc;
}

export function generateAsesorReport(asesores: AsesorStats[]) {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Reporte de Ventas por Asesor', 14, 20);
  
  doc.setFontSize(11);
  doc.text(`Generado: ${formatDate(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, 28);

  const tableData = asesores.map((asesor) => [
    asesor.nombre,
    asesor.ventas.toString(),
    asesor.aprobadas.toString(),
    asesor.pendientes.toString(),
  ]);

  autoTable(doc, {
    startY: 35,
    head: [['Asesor', 'Total Ventas', 'Aprobadas', 'Pendientes']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
  });

  return doc;
}

export function downloadReport(doc: jsPDF, filename: string) {
  doc.save(filename);
}
