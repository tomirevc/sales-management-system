# 🚀 Guía de Instalación Rápida

## Opción 1: Instalación Local

### Paso 1: Instalar Node.js
Si no tienes Node.js instalado, descárgalo de: https://nodejs.org/ (versión 18 o superior)

### Paso 2: Instalar dependencias
Abre una terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```

### Paso 3: Ejecutar en modo desarrollo
```bash
npm run dev
```

### Paso 4: Abrir en el navegador
Navega a: http://localhost:3000

**Credenciales**:
- Email: admin@sistema.com
- Password: admin123

---

## Opción 2: Desplegar en Vercel (Recomendado)

### Método A: Desde GitHub

1. **Sube tu código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **Ve a Vercel**:
   - Visita: https://vercel.com
   - Crea una cuenta o inicia sesión
   - Haz clic en "Add New" > "Project"
   - Importa tu repositorio de GitHub
   - Haz clic en "Deploy"

3. **¡Listo!** Tu app estará disponible en una URL como:
   `https://tu-proyecto.vercel.app`

### Método B: Usando Vercel CLI

1. **Instala Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión**:
   ```bash
   vercel login
   ```

3. **Despliega**:
   ```bash
   vercel
   ```

4. **Para producción**:
   ```bash
   vercel --prod
   ```

---

## Solución de Problemas Comunes

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de permisos en Windows
Ejecuta la terminal como administrador

### Puerto 3000 ocupado
```bash
npm run dev -- -p 3001
```

### LocalStorage no funciona
Verifica que tu navegador permita cookies y almacenamiento local

---

## Verificación de Instalación Correcta

✅ Deberías ver:
- Página de login con diseño moderno
- Sidebar con las opciones de navegación
- Dashboard con gráficos funcionales
- Formularios funcionando correctamente

❌ Si hay errores:
1. Revisa la consola del navegador (F12)
2. Verifica que todas las dependencias se instalaron
3. Asegúrate de usar Node.js 18+

---

## Siguientes Pasos

1. **Cambia las credenciales** en `lib/store/salesStore.ts`
2. **Personaliza los colores** en `app/globals.css`
3. **Prueba todas las funcionalidades**
4. **Despliega en Vercel** para compartir

---

¿Necesitas ayuda? Revisa el README.md completo.
