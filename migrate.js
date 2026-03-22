import fs from "fs/promises";
import pool from "./config/dbConfig.js";
import path from "path";

console.log(`
+-----------------------------------------+
|   MIGRATION IN PROGRESS... Please wait  |
+-----------------------------------------+
    `);

try {
  // create migrations table if it doesn't exist yet
  await pool.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id SERIAL PRIMARY KEY,
                filename TEXT UNIQUE NOT NULL,
                run_on TIMESTAMP DEFAULT NOW()
            )
        `);

  // read all filenames in the migrations folder and filter to only include *.sql files
  let files = await fs.readdir("./database/migrations");
  files = files.filter((file) => file.endsWith(".sql")).sort();

  // fetch already-run migrations file from the migrations table
  const res = await pool.query("SELECT filename FROM migrations");
  const ranFiles = res.rows.map((row) => row.filename);

  // execute files that are not yet ran
  const migrationsFolderPath = "./database/migrations";
  for (let file of files) {
    if (!ranFiles.includes(file)) {
      console.log("Running migration:", file);

      // read the SQL file content
      const sqlQuery = await fs.readFile(
        path.join(migrationsFolderPath, file),
        "utf-8",
      );

      // wrap in a transaction
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        // run the query
        await client.query(sqlQuery);

        // insert the file into the migrations table to indicate that it has been run
        await client.query("INSERT INTO migrations (filename) VALUES ($1)", [
          file,
        ]);

        await client.query("COMMIT");

        console.log("Migration done:", file);
      } catch (error) {
        // rollback if something goes wrong
        await client.query("ROLLBACK");
        console.error("Migration failed:", file, error);
      } finally {
        client.release();
      }
    }
  }
} catch (error) {
  console.error("An error occured while trying to run migrate.js:", error);
}