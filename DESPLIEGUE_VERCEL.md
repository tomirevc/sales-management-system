# 🚀 Despliegue en Vercel - Guía Paso a Paso

## ¿Por qué Vercel?

- ✅ **Gratuito** para proyectos personales
- ✅ **Optimizado** para Next.js
- ✅ **Deploy automático** desde GitHub
- ✅ **HTTPS gratis** incluido
- ✅ **CDN global** ultrarrápido
- ✅ **Sin configuración** necesaria

---

## Método 1: Despliegue desde GitHub (RECOMENDADO)

### Paso 1: Preparar el repositorio

1. **Crear repositorio en GitHub**:
   - Ve a https://github.com/new
   - Nombre: `sales-management-system` (o el que prefieras)
   - Visibilidad: Public o Private
   - Crea el repositorio

2. **Subir el código**:
   ```bash
   # Inicializar git (si no lo hiciste)
   git init
   
   # Agregar todos los archivos
   git add .
   
   # Hacer commit
   git commit -m "Sistema de gestión de ventas completo"
   
   # Conectar con GitHub
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   
   # Subir el código
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Conectar con Vercel

1. **Ir a Vercel**:
   - Visita: https://vercel.com/signup
   - Regístrate con tu cuenta de GitHub

2. **Importar proyecto**:
   - Haz clic en "Add New" → "Project"
   - Selecciona tu repositorio `sales-management-system`
   - Haz clic en "Import"

3. **Configurar proyecto**:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build (autodetectado)
   Output Directory: .next (autodetectado)
   ```

4. **Deploy**:
   - Haz clic en "Deploy"
   - Espera 2-3 minutos
   - ¡Tu app estará lista!

### Paso 3: Obtener tu URL

Tu aplicación estará disponible en:
```
https://tu-proyecto-nombre.vercel.app
```

---

## Método 2: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login

```bash
vercel login
```

### Paso 3: Deploy

En la carpeta del proyecto:

```bash
# Para preview
vercel

# Para producción
vercel --prod
```

---

## Configuración Avanzada (Opcional)

### Personalizar dominio

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Domains
3. Agrega tu dominio personalizado

### Variables de Entorno

Si necesitas agregar variables:

1. Ve a Settings → Environment Variables
2. Agrega las variables necesarias
3. Redeploy el proyecto

**Nota**: Este proyecto no requiere variables de entorno.

### Build Settings

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

---

## Actualizaciones Automáticas

Una vez conectado con GitHub:

1. Haz cambios en tu código local
2. Commit y push:
   ```bash
   git add .
   git commit -m "Actualización"
   git push
   ```
3. Vercel automáticamente detecta y despliega los cambios

---

## Verificación del Despliegue

✅ **Checklist de verificación**:

- [ ] Login funciona correctamente
- [ ] Dashboard muestra estadísticas
- [ ] Formulario de ventas funciona
- [ ] Se pueden subir PDFs
- [ ] Tablas de seguimiento funcionan
- [ ] Reportes se generan y descargan
- [ ] LocalStorage persiste datos
- [ ] Responsive en móvil

---

## Solución de Problemas

### Error: "Build failed"

1. Verifica que `package.json` esté completo
2. Asegúrate de que todas las dependencias estén instaladas
3. Revisa los logs de build en Vercel

### Error: "Runtime error"

1. Abre la consola del navegador (F12)
2. Revisa el error específico
3. Verifica que LocalStorage esté habilitado

### Página en blanco

1. Limpia caché del navegador
2. Verifica la configuración de Next.js
3. Revisa que todos los archivos se hayan subido correctamente

---

## URLs Útiles

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentación Vercel**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Soporte Vercel**: https://vercel.com/support

---

## Mejores Prácticas

1. **Usa GitHub** para control de versiones
2. **Commits frecuentes** para actualizaciones rápidas
3. **Preview deployments** para probar antes de producción
4. **Monitorea analytics** en Vercel Dashboard
5. **Configura alertas** para errores en producción

---

## Límites de Plan Gratuito

- ✅ Despliegues ilimitados
- ✅ 100 GB de ancho de banda/mes
- ✅ HTTPS automático
- ✅ Preview deployments
- ✅ Analytics básicos

---

## ¿Necesitas más capacidad?

Si tu aplicación crece:
- **Pro Plan**: $20/mes - Mayor capacidad y colaboradores
- **Enterprise**: Contactar ventas - Soluciones personalizadas

---

**¡Tu aplicación está lista para el mundo! 🌍**

Comparte tu URL con clientes y equipo de trabajo.
