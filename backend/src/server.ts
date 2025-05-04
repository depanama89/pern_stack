import app from "./app";

import dotenv from "dotenv";
// import { Pool } from "pg";
import env from "./util/validateEnv";
import { pool } from "./db/db";
dotenv.config();

const port = env.PORT;

// Configuration PostgreSQL
// const pool = new Pool({
//   connectionString: env.POSTGRES_URL,
// });

// Test de connexion à la base de données
pool
  .connect()
  .then(() => console.log("Connecté à PostgreSQL avec succès"))
  .catch((err) => console.error("Erreur de connexion à PostgreSQL:", err));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
