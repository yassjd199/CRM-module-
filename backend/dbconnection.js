const sqlite3 = require("sqlite3").verbose();

// Connect to the database
const dbPath = "./db.sqlite3";
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
module.exports = db;
