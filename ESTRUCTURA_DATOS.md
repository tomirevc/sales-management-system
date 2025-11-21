# 📊 Estructura de Datos del Sistema

## Modelo de Datos Principal: Sale (Venta)

### Interfaz TypeScript

```typescript
interface Sale {
  id: string;                    // ID único generado automáticamente
  asesor: string;                // Nombre del asesor
  fecha: string;                 // Fecha de la venta (ISO format)
  dniCliente: string;            // DNI del cliente (8 dígitos)
  nombreCliente: string;         // Nombre del cliente
  apellidoCliente: string;       // Apellido del cliente
  direccion: string;             // Dirección del cliente
  ubicacion: string;             // Ubicación del domicilio
  tipoVenta: 'empotrada' | 'a la vista';  // Tipo de venta
  observacion: string;           // Observaciones adicionales
  estado: 'pendiente' | 'aprobada' | 'anulada';  // Estado de la venta
  pdfUrl?: string;               // URL del PDF en Base64
  pdfName?: string;              // Nombre del archivo PDF
  createdAt: string;             // Fecha de creación (ISO format)
  updatedAt: string;             // Fecha de última actualización
}
```

### Ejemplo de Datos

```json
{
  "id": "1699999999999-abc123xyz",
  "asesor": "Juan Pérez",
  "fecha": "2024-03-15",
  "dniCliente": "12345678",
  "nombreCliente": "María",
  "apellidoCliente": "García",
  "direccion": "Av. Principal 123",
  "ubicacion": "San Isidro, Lima",
  "tipoVenta": "empotrada",
  "observacion": "Cliente prefiere instalación en la mañana",
  "estado": "pendiente",
  "pdfUrl": "data:application/pdf;base64,JVBERi0xLjQK...",
  "pdfName": "contrato-maria-garcia.pdf",
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-03-15T10:30:00.000Z"
}
```

## Estados de Ventas

### pendiente
- Venta recién registrada
- Requiere aprobación
- Visible en módulo "SEGUIMIENTO"
- Color: Naranja

### aprobada
- Venta confirmada y validada
- Ya no requiere acción
- Visible en módulo "SEGUIMIENTO"
- Color: Verde

### anulada
- Venta cancelada
- No aparece en seguimiento
- Solo visible en módulo "ANULADAS"
- Color: Rojo

## Persistencia de Datos

### LocalStorage Key: `sales-storage`

```json
{
  "state": {
    "sales": [...],           // Array de ventas
    "user": {
      "email": "admin@sistema.com",
      "name": "Administrador"
    },
    "isAuthenticated": true
  },
  "version": 0
}
```

### Límites de Almacenamiento

- **Capacidad**: ~5-10 MB por dominio
- **PDFs**: Guardados como Base64 (incrementan tamaño)
- **Recomendación**: Máximo 100-200 ventas con PDFs

## Estadísticas Calculadas

### DashboardStats
```typescript
{
  ventasPendientes: number;    // Cantidad pendiente
  ventasPorSubsanar: number;   // Alias de pendientes
  ventasTotales: number;       // Total de ventas
  ventasAprobadas: number;     // Cantidad aprobada
  ventasAnuladas: number;      // Cantidad anulada
}
```

### AsesorStats
```typescript
{
  nombre: string;              // Nombre del asesor
  ventas: number;              // Total de ventas
  aprobadas: number;           // Ventas aprobadas
  pendientes: number;          // Ventas pendientes
}
```

## Filtros de Reportes

### ReportFilters
```typescript
{
  tipo: 'mensual' | 'quincenal';
  fechaInicio?: string;        // Formato: YYYY-MM-DD
  fechaFin?: string;           // Formato: YYYY-MM-DD
  asesor?: string;             // Nombre del asesor
}
```

## Operaciones CRUD

### CREATE (Agregar Venta)
```typescript
addSale(saleData: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>)
```

### READ (Obtener Ventas)
```typescript
getPendingSales(): Sale[]       // Ventas pendientes
getApprovedSales(): Sale[]      // Ventas aprobadas
getAnnulledSales(): Sale[]      // Ventas anuladas
getSalesByAsesor(asesor: string): Sale[]  // Por asesor
```

### UPDATE (Actualizar Venta)
```typescript
updateSale(id: string, updates: Partial<Sale>)
updateSaleStatus(id: string, status: SaleStatus)
updateMultipleSalesStatus(ids: string[], status: SaleStatus)
```

### DELETE (Eliminar Venta)
```typescript
deleteSale(id: string)
```

## Validaciones

### Campos Requeridos
- ✅ asesor
- ✅ fecha
- ✅ dniCliente (8 dígitos)
- ✅ nombreCliente
- ✅ apellidoCliente
- ✅ direccion
- ✅ ubicacion
- ✅ tipoVenta

### Campos Opcionales
- observacion
- pdfUrl
- pdfName

### Formato de DNI
- Exactamente 8 caracteres numéricos
- Sin guiones ni espacios

### Formato de PDF
- Solo archivos .pdf
- Convertidos a Base64 para almacenamiento
- Máximo recomendado: 2-3 MB por archivo

## Migraciones y Actualizaciones

Si necesitas agregar nuevos campos:

1. Actualiza la interfaz en `lib/types/index.ts`
2. Actualiza el store en `lib/store/salesStore.ts`
3. Actualiza los formularios correspondientes
4. Los datos antiguos seguirán funcionando (campos opcionales)

Ejemplo:
```typescript
// Agregar campo "telefono"
interface Sale {
  // ... campos existentes
  telefono?: string;  // Opcional para compatibilidad
}
```

## Backup y Exportación

Para respaldar datos:

```javascript
// En la consola del navegador:
const data = localStorage.getItem('sales-storage');
console.log(data);  // Copiar y guardar en un archivo
```

Para restaurar:
```javascript
const backup = '...'; // Tu backup JSON
localStorage.setItem('sales-storage', backup);
location.reload();
```

---

**Nota**: Esta estructura es flexible y puede extenderse según necesidades futuras.
