# Usa la versión exacta de Node que necesitas
FROM node:22.17.1-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json primero para aprovechar la cache
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación NestJS
RUN npm run build

# Exponer el puerto (normalmente NestJS corre en 3000)
EXPOSE 3000

# Comando para arrancar la app en producción
CMD ["node", "dist/main.js"]
