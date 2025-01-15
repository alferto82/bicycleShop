import { Sequelize } from "sequelize";

// Puedes reemplazar con la configuración de tu base de datos, aquí estamos usando SQLite para ejemplo.
export const sequelize = new Sequelize({
  dialect: "sqlite", // Puede cambiarse a 'postgres', 'mysql', 'mssql', etc.
  storage: "./src/database.sqlite", // Ruta al archivo SQLite, o la URL de conexión en el caso de otras bases de datos
  logging: console.log, // Activar los logs de las consultas SQL si lo necesitas
  define: {
    timestamps: true, // Por defecto Sequelize usa 'createdAt' y 'updatedAt'
  },
});
