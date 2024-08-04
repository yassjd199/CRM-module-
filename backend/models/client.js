const db = require("../dbconnection");

// Create client table if not exists
const createClientTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS client (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL
        )
    `;
  db.run(sql, (err) => {
    if (err) {
      console.error("Error creating client table:", err.message);
    } else {
      console.log("Client table created or already exists.");
    }
  });
};

module.exports = {
  createClientTable,
};
