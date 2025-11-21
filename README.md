# Sistema de Gestión de Ventas

Sistema completo de gestión y seguimiento de ventas desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características Principales

- ✅ Autenticación estática (sin base de datos)
- 📊 Dashboard con estadísticas en tiempo real
- 📝 Formulario de registro de ventas con upload de PDFs
- 🔍 Seguimiento y edición de ventas
- 📋 CRUD completo de ventas
- ❌ Gestión de ventas anuladas
- 📈 Reportes con gráficos interactivos
- 📥 Generación y descarga de reportes PDF
- 💾 Persistencia local con LocalStorage
- 🎨 Interfaz moderna y responsive

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Estado Global**: Zustand
- **Gráficos**: Recharts
- **PDFs**: jsPDF + jsPDF-autoTable
- **Iconos**: Lucide React
- **Formularios**: React Hook Form
- **Utilidades**: date-fns, clsx, tailwind-merge

## 📦 Instalación

1. Clonar el repositorio o descargar los archivos

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## 🔑 Credenciales de Acceso

**Email**: admin@sistema.com  
**Password**: admin123

*Nota: Puedes cambiar las credenciales editando el archivo `lib/store/salesStore.ts`*

## 📁 Estructura del Proyecto

```
sales-management-system/
├── app/                          # Rutas de la aplicación
│   ├── dashboard/               # Dashboard principal
│   │   ├── inicio/             # Página de inicio
│   │   ├── ventas/             
│   │   │   ├── subir/          # Subir nuevas ventas
│   │   │   ├── seguimiento/    # Seguimiento y edición
│   │   │   ├── todo/           # CRUD completo
│   │   │   └── anuladas/       # Ventas anuladas
│   │   └── reportes/           # Reportes y estadísticas
│   ├── login/                   # Página de login
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página de inicio
│   └── globals.css             # Estilos globales
├── components/                  # Componentes reutilizables
│   ├── ui/                     # Componentes UI base
│   └── dashboard/              # Componentes del dashboard
├── lib/                        # Utilidades y lógica
│   ├── store/                  # Store de Zustand
│   ├── types/                  # Tipos TypeScript
│   └── utils/                  # Funciones helper
└── public/                     # Archivos estáticos
```

## 🎯 Funcionalidades Detalladas

### 1. **INICIO**
- Dashboard con métricas principales
- Gráficos de ventas (barras y pie chart)
- Lista de asesores con estadísticas
- Resumen de ventas pendientes, aprobadas y anuladas

### 2. **SUBIR**
- Formulario completo para registrar ventas
- Campos: Asesor, Fecha, DNI, Cliente, Dirección, Ubicación, Tipo de venta
- Upload de archivos PDF
- Lista de ventas pendientes de aprobación

### 3. **SEGUIMIENTO**
- Tabla con todas las ventas activas
- Edición inline de campos
- Visualización de PDFs adjuntos
- Cambio de estado (Pendiente/Aprobada)
- Selección múltiple para aprobar/anular en lote

### 4. **TODO**
- Vista completa de todas las ventas
- CRUD completo con opción de eliminar
- Tabla ordenada por fecha de creación

### 5. **ANULADAS**
- Historial de ventas anuladas
- Vista de solo lectura
- Registro de fechas de anulación

### 6. **REPORTES**
- Filtros por período (mensual/quincenal)
- Filtros por asesor
- Gráficos interactivos
- Métricas en tiempo real
- Descarga de reportes PDF:
  - Ventas totales
  - Ventas sin aprobar
  - Ventas aprobadas
  - Reporte por asesor

## 🎨 Personalización

### Cambiar Credenciales
Edita `lib/store/salesStore.ts`:
```typescript
const VALID_CREDENTIALS = {
  email: 'tu-email@example.com',
  password: 'tu-password'
};
```

### Modificar Colores
Edita `app/globals.css` o `tailwind.config.js`

### Agregar Campos al Formulario
1. Actualiza la interfaz `Sale` en `lib/types/index.ts`
2. Modifica el formulario en `app/dashboard/ventas/subir/page.tsx`
3. Actualiza las tablas correspondientes

## 🚀 Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)

2. Instala Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
vercel
```

O conecta tu repositorio de GitHub directamente desde el dashboard de Vercel.

### Variables de Entorno (Opcional)
Si necesitas configurar variables:
```
# No se requieren variables de entorno para esta versión
```

## 📝 Notas Importantes

- **Persistencia**: Los datos se guardan en LocalStorage del navegador
- **Límites**: Aproximadamente 5-10 MB de almacenamiento
- **PDFs**: Se guardan como Base64 en LocalStorage
- **Sin Backend**: No requiere servidor ni base de datos
- **Responsive**: Optimizado para desktop y mobile

## 🔧 Comandos Disponibles

```bash
npm run dev      # Modo desarrollo
npm run build    # Build para producción
npm run start    # Iniciar producción
npm run lint     # Ejecutar linter
```

## 📱 Navegadores Soportados

- Chrome (recomendado)
- Firefox
- Safari
- Edge

## 🤝 Soporte

Para problemas o preguntas:
1. Revisa la consola del navegador
2. Verifica que localStorage esté habilitado
3. Limpia la caché si hay problemas

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

**Desarrollado con ❤️ usando Next.js 14 y TypeScript**
