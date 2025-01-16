# Usamos una imagen base de Node.js
FROM node:16

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos del proyecto al contenedor
COPY ./frontend/package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de archivos del frontend
COPY ./frontend .

# Construimos el proyecto para producción
RUN npm run build

# Exponemos el puerto que usará el frontend
EXPOSE 3000

# Comando para iniciar el servidor en modo producción
CMD ["npm", "start"]
