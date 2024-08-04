const db = require("../dbconnection");

// Insert a new contract

// const insertContract = (req,res)=>{
//   const {}
// }

// Get all contracts
const getAllContracts = (req, res) => {
  const sql = `SELECT * FROM contract`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching contracts:", err.message);
    } else {
      res.json(rows);
      rows.forEach((row) => {
        console.log(`${row.id} - ${row.object} - Client ID: ${row.client_id}`);
      });
    }
  });
};

const getContract = (req, res) => {
  const { client_id } = req.body;
  const sql = `SELECT * FROM contract WHERE client_id = ?;`;
  db.all(sql, [client_id], (errrows) => {
    if (err) {
      console.log(err);
      res.status(404).send(err.message);
    } else {
      res.json(rows);
    }
  });
};

// Update a contract
const updateContract = (req, res) => {
  const {
    object,
    date,
    village,
    client_id,
    subject,
    phone_number,
    fiscal_code,
    file,
  } = req.body;
  const sql = `
        UPDATE contract 
        SET object = ?, date = ?, village = ?, client_id = ?, subject = ?, phone_number = ?, fiscal_code = ?, file = ?
        WHERE id = ?
    `;
  db.run(
    sql,
    [
      object,
      date,
      village,
      client_id,
      subject,
      phone_number,
      fiscal_code,
      file,
    ],
    function (err) {
      if (err) {
        console.error("Error updating contract:", err.message);
      } else {
        console.log(`Contract with ID ${contractId} updated successfully`);
      }
    }
  );
};
// Create a new contract
const createContract = (req, res) => {
  const {
    object,
    date,
    village,
    client_id,
    subject,
    phone_number,
    fiscal_code,
    file,
  } = req.body;
  const sql = `
        INSERT INTO contract (object, date, village, client_id, subject, phone_number, fiscal_code, file)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  db.run(
    sql,
    [
      object,
      date,
      village,
      client_id,
      subject,
      phone_number,
      fiscal_code,
      file,
    ],
    function (err) {
      if (err) {
        console.error("Error creating contract:", err.message);
        res.status(500).json({ error: "Failed to create contract" });
      } else {
        console.log(`Contract with ID ${this.lastID} created successfully`);
        res
          .status(201)
          .json({
            message: "Contract created successfully",
            contractId: this.lastID,
          });
      }
    }
  );
};

module.exports = {
  getAllContracts,
  updateContract,
  createContract,
};
