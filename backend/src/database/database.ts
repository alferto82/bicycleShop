import { Sequelize } from "sequelize";

// Puedes reemplazar con la configuración de tu base de datos, aquí estamos usando SQLite para ejemplo.
export const sequelize = new Sequelize({
  dialect: "sqlite", // Puede cambiarse a 'postgres', 'mysql', 'mssql', etc.
  storage: "./src/database.sqlite", // sqlite://database.sqlite
  logging: console.log, // Activar los logs de las consultas SQL si lo necesitas
  define: {
    timestamps: true, // Por defecto Sequelize usa 'createdAt' y 'updatedAt'
  },
});
