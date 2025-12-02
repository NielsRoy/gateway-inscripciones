# --- ETAPA 1: BUILD (Compilación) ---

# 1. Definimos la imagen base. "alpine" es una versión de Linux ultra-ligera (5MB).
# REEMPLAZA "18" con tu versión de node si es diferente.
FROM node:22-alpine AS build

# 2. Creamos el directorio dentro del contenedor donde vivirá tu app.
WORKDIR /usr/src/app

# 3. Copiamos SOLO los archivos de definición de paquetes primero.
# ¿Por qué? Docker guarda en caché (memoria) cada paso. Si tu código cambia
# pero tus dependencias no, Docker se salta el "npm install" y ahorras minutos.
COPY package*.json ./

# 4. Instalamos las dependencias. "npm ci" es como "install" pero
# estricto para servidores (Clean Install). Es más rápido y seguro.
RUN npm ci

# 5. Ahora sí, copiamos todo el resto de tu código fuente al contenedor.
COPY . .

# 6. Compilamos TypeScript a JavaScript (crea la carpeta /dist).
RUN npm run build

# --- ETAPA 2: PRODUCTION (Ejecución) ---

# 7. Empezamos desde cero con una imagen limpia.
FROM node:22-alpine AS production

# 8. Variable de entorno para que NestJS sepa que es producción (optimiza logs, etc).
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# 9. Copiamos package.json de nuevo.
COPY package*.json ./

# 10. Instalamos SOLO las dependencias necesarias para correr (sin devDependencies).
# Esto reduce drásticamente el tamaño de la imagen.
RUN npm ci --only=production

# 11. Aquí está la magia: Copiamos SOLO la carpeta "dist" desde la etapa "build".
# No copiamos el código fuente "src" original.
COPY --from=build /usr/src/app/dist ./dist

# IMPORTANTE: Documentar que este contenedor escucha en el 3000
EXPOSE 3000

# 12. El comando que arranca tu aplicación.
CMD ["node", "dist/main"]