# Catálogo de Animales

Una aplicación full-stack para gestionar un catálogo de animales con información detallada y referencias a Wikipedia.

## Características

- 🦁 Catálogo completo de animales con información detallada
- 🔍 Búsqueda y precarga automática de información desde Wikipedia
- 🖼️ Previsualización de imágenes
- 🎨 Interfaz moderna con Material-UI
- 🔒 Sistema de autenticación
- 📱 Diseño responsive

## Estructura del Proyecto

```
plantillasg/
├── backend/         # API NestJS
└── frontend/        # Aplicación React + Vite
```

## Requisitos Previos

- Node.js (v18 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Configuración Inicial

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd plantillasg
   ```

2. **Backend (NestJS)**
   ```bash
   cd backend
   npm install
   ```
   
   Crear archivo `.env` en la carpeta `backend/` con:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_DATABASE=myapp
   JWT_SECRET=tu_clave_secreta
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend (React + Vite)**
   ```bash
   cd frontend
   npm install
   ```

4. **Base de datos**
   ```sql
   CREATE DATABASE myapp;
   ```

## Ejecutar el Proyecto

1. **Backend**
   ```bash
   cd backend
   npm run start:dev
   ```
   El servidor estará disponible en `http://localhost:3000`

2. **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

## Desarrollo

- Backend: El código fuente está en `backend/src/`
- Frontend: El código fuente está en `frontend/src/`
- La documentación de la API está disponible en `http://localhost:3000/api`

## Tecnologías Utilizadas

### Backend
- NestJS
- TypeORM
- MySQL
- JWT Authentication
- Swagger/OpenAPI

### Frontend
- React
- Vite
- Material-UI
- React Router
- Axios
- TailwindCSS

## Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 