# ---- Etapa 1: Build ----
# En esta etapa se instala todo (incluyendo devDependencies) y se compila el código.
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copia los archivos de paquetes e instala TODAS las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# ---- COMANDO DE DEPURACIÓN ----
# Lista el contenido de node_modules/@types para verificar si los tipos existen.
RUN ls -la node_modules/@types

# Ejecuta el script de build para generar la carpeta /dist
RUN npm run build


# ---- Etapa 2: Producción ----
# Esta es la imagen final, limpia y optimizada.
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia los archivos de paquetes de nuevo
COPY package*.json ./

# Instala SOLAMENTE las dependencias de producción
RUN npm install --production

# Copia la carpeta /dist (con el código ya compilado) desde la etapa 'builder'
COPY --from=builder /usr/src/app/dist ./dist

# Expone el puerto que la aplicación usará
EXPOSE 3002

# El comando para iniciar la aplicación
CMD [ "npm", "start" ]
