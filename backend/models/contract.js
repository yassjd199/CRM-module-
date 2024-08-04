const db = require("../dbconnection");

// Create contract table if not exists
const createContractTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS contract (
      contract_id INTEGER PRIMARY KEY AUTOINCREMENT,
      object TEXT,
      date TEXT,
      village TEXT,
      client_id INTEGER,
      subject TEXT,
      phone_number TEXT,
      fiscal_code TEXT,
      file_url TEXT NOT NULL,  
      email TEXT NOT NULL ,
      FOREIGN KEY(client_id) REFERENCES client(id)
    )
  `;
  db.run(sql, (err) => {
    if (err) {
      console.error("Error creating contract table:", err.message);
    } else {
      console.log("Contract table created or already exists.");
    }
  });
};

module.exports = {
  createContractTable,
};
