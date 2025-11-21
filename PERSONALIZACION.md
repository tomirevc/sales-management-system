# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar el sistema según tus necesidades.

---

## 1. Cambiar Credenciales de Login

**Archivo**: `lib/store/salesStore.ts`

```typescript
// Busca estas líneas:
const VALID_CREDENTIALS = {
  email: 'admin@sistema.com',
  password: 'admin123'
};

// Cámbialo por:
const VALID_CREDENTIALS = {
  email: 'tuempresa@email.com',
  password: 'TuContraseñaSegura123!'
};
```

---

## 2. Cambiar Nombre de la Empresa

**Archivo**: `components/dashboard/Sidebar.tsx`

```typescript
// Busca:
<h1 className="text-2xl font-bold text-primary">Sistema Ventas</h1>

// Cambia por:
<h1 className="text-2xl font-bold text-primary">Tu Empresa</h1>
```

**Archivo**: `app/login/page.tsx`

```typescript
// Busca:
<CardTitle className="text-2xl font-bold">Sistema de Ventas</CardTitle>

// Cambia por:
<CardTitle className="text-2xl font-bold">Tu Empresa</CardTitle>
```

---

## 3. Personalizar Colores del Sistema

### Opción A: Cambiar Colores Principales

**Archivo**: `app/globals.css`

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Azul por defecto */
  /* Cambia por tus colores preferidos en formato HSL */
}

/* Ejemplos de colores populares:
Verde: 142 76% 36%
Morado: 262 83% 58%
Rojo: 0 72% 51%
Naranja: 25 95% 53%
*/
```

### Opción B: Usar Generador de Temas

1. Visita: https://ui.shadcn.com/themes
2. Elige tus colores
3. Copia el CSS generado
4. Pégalo en `app/globals.css`

---

## 4. Agregar Nuevos Campos al Formulario

### Ejemplo: Agregar campo "Teléfono"

**Paso 1**: Actualizar tipo de datos  
**Archivo**: `lib/types/index.ts`

```typescript
export interface Sale {
  // ... campos existentes
  telefono?: string;  // Nuevo campo
}
```

**Paso 2**: Actualizar formulario  
**Archivo**: `app/dashboard/ventas/subir/page.tsx`

```typescript
// Agregar al estado:
const [formData, setFormData] = useState({
  // ... campos existentes
  telefono: '',
});

// Agregar en el formulario:
<div className="space-y-2">
  <Label htmlFor="telefono">Teléfono</Label>
  <Input
    id="telefono"
    name="telefono"
    value={formData.telefono}
    onChange={handleInputChange}
    placeholder="999 999 999"
  />
</div>
```

**Paso 3**: Actualizar tablas (opcional)

Agrega la columna en las tablas de seguimiento y todo.

---

## 5. Personalizar Estados de Ventas

**Archivo**: `lib/types/index.ts`

```typescript
// Puedes agregar más estados:
export type SaleStatus = 'pendiente' | 'aprobada' | 'anulada' | 'en_proceso' | 'rechazada';
```

Luego actualiza los colores en cada página donde se muestren.

---

## 6. Modificar Tipos de Venta

**Archivo**: `lib/types/index.ts`

```typescript
// Cambia los tipos según tu negocio:
export type SaleType = 'tipo1' | 'tipo2' | 'tipo3';
```

**Archivo**: `app/dashboard/ventas/subir/page.tsx`

```typescript
<Select>
  <option value="tipo1">Tipo 1</option>
  <option value="tipo2">Tipo 2</option>
  <option value="tipo3">Tipo 3</option>
</Select>
```

---

## 7. Personalizar Sidebar

### Agregar Nueva Opción

**Archivo**: `components/dashboard/Sidebar.tsx`

```typescript
import { TuIcono } from 'lucide-react';

const menuItems = [
  // ... items existentes
  { name: 'NUEVA OPCIÓN', icon: TuIcono, href: '/dashboard/nueva-ruta' },
];
```

### Cambiar Iconos

Busca iconos en: https://lucide.dev/icons

```typescript
import { Home, Upload, Zap } from 'lucide-react';
```

---

## 8. Personalizar Reportes

### Agregar Nuevo Tipo de Reporte

**Archivo**: `app/dashboard/reportes/page.tsx`

```typescript
// Agrega nuevo botón:
<Button onClick={() => handleDownloadReport('mi_reporte')}>
  <Download className="mr-2 h-4 w-4" />
  Mi Reporte Personalizado
</Button>
```

### Personalizar PDF

**Archivo**: `lib/utils/reportGenerator.ts`

```typescript
// Modifica los encabezados, colores, fuentes, etc.
doc.setFontSize(18);
doc.setTextColor(0, 0, 255); // Azul
```

---

## 9. Cambiar Logo

### Agregar Imagen

1. Guarda tu logo en `public/logo.png`

2. **Actualizar Sidebar**:  
   **Archivo**: `components/dashboard/Sidebar.tsx`

```typescript
import Image from 'next/image';

// Reemplaza el texto por:
<Image 
  src="/logo.png" 
  alt="Logo" 
  width={150} 
  height={50}
/>
```

---

## 10. Personalizar Validaciones

### Cambiar Formato de DNI

**Archivo**: `app/dashboard/ventas/subir/page.tsx`

```typescript
// Para DNI de 10 dígitos:
<Input
  maxLength={10}
  pattern="[0-9]{10}"
/>
```

### Agregar Validaciones Personalizadas

```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Tu validación personalizada
  if (formData.asesor.length < 3) {
    alert('Nombre de asesor muy corto');
    return;
  }
  
  // Continuar con el submit...
};
```

---

## 11. Cambiar Idioma

Para cambiar textos a otro idioma, busca y reemplaza en todos los archivos:

```typescript
// Español → English
"Ventas Totales" → "Total Sales"
"Pendiente" → "Pending"
"Aprobada" → "Approved"
```

---

## 12. Agregar Múltiples Usuarios

Si necesitas más usuarios:

**Archivo**: `lib/store/salesStore.ts`

```typescript
const VALID_USERS = [
  { email: 'admin@sistema.com', password: 'admin123', role: 'admin' },
  { email: 'vendedor@sistema.com', password: 'vend123', role: 'vendedor' },
];

login: (email, password) => {
  const user = VALID_USERS.find(u => 
    u.email === email && u.password === password
  );
  if (user) {
    set({ isAuthenticated: true, user });
    return true;
  }
  return false;
}
```

---

## 13. Personalizar Gráficos

**Archivo**: `app/dashboard/inicio/page.tsx`

```typescript
// Cambiar colores:
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

// Cambiar tipo de gráfico:
import { LineChart, PieChart, AreaChart } from 'recharts';
```

---

## 14. Agregar Campos de Búsqueda

Ejemplo en seguimiento:

```typescript
const [searchTerm, setSearchTerm] = useState('');

const filteredSales = sales.filter(sale =>
  sale.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
  sale.dniCliente.includes(searchTerm)
);
```

---

## 15. Exportar a Excel

Instala librería:

```bash
npm install xlsx
```

**Código**:

```typescript
import * as XLSX from 'xlsx';

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(sales);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ventas");
  XLSX.writeFile(wb, "ventas.xlsx");
};
```

---

## 💡 Consejos Finales

1. **Haz backup** antes de cambios grandes
2. **Prueba localmente** antes de desplegar
3. **Documenta** tus cambios personalizados
4. **Usa Git** para control de versiones
5. **Mantén código limpio** y comentado

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona después de personalizar:

1. Revisa la consola del navegador (F12)
2. Verifica que no haya errores de sintaxis
3. Asegúrate de reiniciar el servidor (`npm run dev`)
4. Limpia caché y node_modules si es necesario

---

**¡Haz el sistema completamente tuyo! 🎨**
