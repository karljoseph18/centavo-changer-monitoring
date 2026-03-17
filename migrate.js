import fs from "fs/promises";

const files = await fs.readdir("./database/migrations");
console.log(files);
