# Catálogo de Animales

Una aplicación full-stack para gestionar un catálogo de animales con información detallada y referencias a Wikipedia.

## Características

- 🦁 Catálogo completo de animales con información detallada
- 🔍 Búsqueda y precarga automática de información desde Wikipedia
- 🖼️ Previsualización de imágenes
- 🎨 Interfaz moderna con Material-UI
- 🔒 Sistema de autenticación JWT
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

## Flujo de Autenticación JWT

El sistema implementa autenticación basada en JSON Web Tokens (JWT). Aquí está el flujo completo:

### 1. Proceso de Login

1. **Frontend (React)**:
   - El usuario ingresa credenciales en el formulario de login
   - El frontend hace una petición POST a `/auth/login` con:
     ```json
     {
       "email": "usuario@ejemplo.com",
       "password": "contraseña"
     }
     ```

2. **Backend (NestJS)**:
   - Valida las credenciales contra la base de datos
   - Si son válidas, genera un JWT con:
     - Payload: `{ sub: userId, email: userEmail }`
     - Secret key: Definida en `.env`
     - Expiración: 24 horas
   - Retorna:
     ```json
     {
       "access_token": "eyJhbGciOiJIUzI1NiIs..."
     }
     ```

3. **Almacenamiento**:
   - El frontend almacena el token en `localStorage`
   - Se configura Axios para incluir el token en todas las peticiones:
     ```typescript
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     ```

### 2. Protección de Rutas

1. **Frontend**:
   - Implementa guard routes con React Router
   - Verifica presencia del token antes de renderizar rutas protegidas
   - Redirige a /login si no hay token válido

2. **Backend**:
   - Usa `@UseGuards(JwtAuthGuard)` en controladores protegidos
   - Valida el token en cada petición
   - Extrae información del usuario del token

### 3. Manejo de Errores

- Token expirado: Redirige a login
- Token inválido: Retorna 401 Unauthorized
- Token ausente: Retorna 401 Unauthorized

## Despliegue de la Solución

La aplicación está diseñada para ser desplegada en una arquitectura de microservicios usando Docker y servicios cloud. Aquí el detalle de la estrategia de despliegue:

### Frontend (React + Vite)

**Plataforma**: Vercel
- **Justificación**:
  - Integración automática con Git
  - Optimización automática de assets
  - SSL gratuito
  - CDN global
  - Zero-config deployment

**Proceso de Despliegue**:
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Automatic deployments en cada push

### Backend (NestJS)

**Plataforma**: Railway
- **Justificación**:
  - Soporte nativo para Node.js
  - Escalado automático
  - Monitoreo integrado
  - Base de datos gestionada
  - CI/CD simplificado

**Proceso de Despliegue**:
1. Configurar Dockerfile:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   CMD ["npm", "run", "start:prod"]
   ```

2. Configurar variables de entorno en Railway
3. Conectar con repositorio Git
4. Railway se encarga del build y deploy

### Base de Datos

**Plataforma**: Railway MySQL
- **Justificación**:
  - Backups automáticos
  - Alta disponibilidad
  - Escalado automático
  - Monitoreo incluido
  - Mismo proveedor que el backend

### Alternativas Consideradas

1. **Heroku**:
   - Pros: Fácil de usar
   - Contras: Más costoso, menos flexible

2. **AWS**:
   - Pros: Muy flexible y potente
   - Contras: Curva de aprendizaje alta, configuración compleja

3. **DigitalOcean**:
   - Pros: Buena relación precio/prestaciones
   - Contras: Requiere más configuración manual

La combinación Vercel + Railway fue elegida por:
- Facilidad de despliegue
- Costos predecibles
- Excelente developer experience
- Escalabilidad automática
- Mínima configuración necesaria

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