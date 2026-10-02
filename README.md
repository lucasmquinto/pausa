# PAUSA

Micro-app devocional mobile-first para Belén, construida con React + TypeScript + Vite.

## Incluye
- Home editorial con saludo contextual y pausa diaria.
- 30 devocionales locales con referencias bíblicas y traducción RVR 1909.
- Flujo de lectura por etapas: versículo → reflexión → escritura → oración → cierre.
- Favoritos, diario, calendario mensual y estados de ánimo.
- Explorar por categorías y búsqueda instantánea.
- Devocional aleatorio sin repetición inmediata.
- Pausa de mañana y pausa nocturna.
- Preferencias, tema oscuro, tamaño de texto y animaciones.
- Persistencia local con `localStorage`.
- Exportación TXT/JSON del diario.
- PWA con manifest, icono y service worker.
- Accesibilidad básica, reduced motion y responsive 390px → desktop.

## Ejecutar

```bash
npm install
npm run dev
```

Para producción:

```bash
npm run build
npm run preview
```

El entorno de construcción usado para generar este artefacto no pudo completar `npm install` porque el acceso al registro de paquetes agotó el tiempo de espera; por eso no se incluyó `node_modules`. El código fuente y la configuración quedan listos para instalar dependencias en un entorno con acceso a npm.
