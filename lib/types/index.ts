// lib/types/index.ts

export type SaleStatus = 'pendiente' | 'aprobada' | 'anulada';

export type SaleType = 'empotrada' | 'a la vista';

export interface Sale {
  id: string;
  asesor: string;
  fecha: string;
  dniCliente: string;
  nombreCliente: string;
  apellidoCliente: string;
  direccion: string;
  ubicacion: string;
  tipoVenta: SaleType;
  observacion: string;
  estado: SaleStatus;
  pdfUrl?: string;
  pdfName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  ventasPendientes: number;
  ventasPorSubsanar: number;
  ventasTotales: number;
  ventasAprobadas: number;
  ventasAnuladas: number;
}

export interface AsesorStats {
  nombre: string;
  ventas: number;
  aprobadas: number;
  pendientes: number;
}

export interface ReportFilters {
  tipo: 'mensual' | 'quincenal';
  fechaInicio?: string;
  fechaFin?: string;
  asesor?: string;
}

export interface User {
  email: string;
  name: string;
}
