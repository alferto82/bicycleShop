# Usamos una imagen base de Node.js
FROM node:18-bullseye

# Establecemos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos del proyecto al contenedor
COPY ./backend/package.json ./backend/pnpm-lock.yaml ./

# Instalamos las dependencias
RUN npm install -g pnpm && pnpm install --frozen-lockfile


# Copiamos el resto de archivos del backend
COPY ./backend ./

# Exponemos el puerto que usará el backend
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["npm", "start"]
