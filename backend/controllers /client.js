const db = require("../dbconnection");
const { insertContract } = require("./contract");

const insertClient = (req, res) => {
  const { first_name, last_name } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File is required." });
  }

  // Ensure the file URL path matches your static file serving configuration
  const fileUrl = `/uploads/${file.filename}`;
  const currentDate = new Date().toISOString(); // Gets current date in ISO format

  db.run("BEGIN TRANSACTION", (beginErr) => {
    if (beginErr) {
      console.error("Error starting transaction:", beginErr.message);
      return res.status(500).json({ error: "Error starting transaction." });
    }

    const insertClientSQL = `INSERT INTO client (first_name, last_name) VALUES (?, ?)`;
    db.run(insertClientSQL, [first_name, last_name], function (err) {
      if (err) {
        console.error("Error inserting client:", err.message);
        db.run("ROLLBACK", (rollbackErr) => {
          if (rollbackErr) {
            console.error(
              "Error rolling back transaction:",
              rollbackErr.message
            );
          }
          return res.status(500).json({ error: "Error inserting client." });
        });
      } else {
        const clientId = this.lastID;

        const insertContractSQL = `INSERT INTO contract (client_id, file_url, date) VALUES (?, ?, ?)`;
        db.run(
          insertContractSQL,
          [clientId, fileUrl, currentDate],
          function (err) {
            if (err) {
              console.error("Error inserting contract:", err.message);
              db.run("ROLLBACK", (rollbackErr) => {
                if (rollbackErr) {
                  console.error(
                    "Error rolling back transaction:",
                    rollbackErr.message
                  );
                }
                return res
                  .status(500)
                  .json({ error: "Error inserting contract." });
              });
            } else {
              db.run("COMMIT", (commitErr) => {
                if (commitErr) {
                  console.error(
                    "Error committing transaction:",
                    commitErr.message
                  );
                  return res
                    .status(500)
                    .json({ error: "Error committing transaction." });
                } else {
                  console.log(
                    `Client and contract inserted successfully with client ID ${clientId}`
                  );
                  res.status(200).json({
                    message: `Client and contract inserted successfully with client ID ${clientId}`,
                  });
                }
              });
            }
          }
        );
      }
    });
  });
};

// Get all clients
const getAllClients = (req, res) => {
  const sql =
    "SELECT client.id, client.first_name, client.last_name,contract.date, contract.file_url FROM client LEFT JOIN contract ON client.id = contract.client_id;";
  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Error getting clients:", err.message);
      res.status(500).send("Error getting clients");
    } else {
      res.json(rows);
    }
  });
};

// Update a client
const updateClient = (req, res) => {
  const { id, first_name, last_name } = req.body;
  // Start a transaction
  db.run("BEGIN TRANSACTION", (beginErr) => {
    if (beginErr) {
      console.error("Error starting transaction:", beginErr.message);
      return res.status(500).json({ error: "Error starting transaction." });
    }

    // Update client
    const sql = `UPDATE client SET first_name = ?, last_name = ? WHERE id = ?`;
    db.run(sql, [first_name, last_name, id], function (updateErr) {
      if (updateErr) {
        console.error("Error updating client:", updateErr.message);
        // Rollback transaction on error
        db.run("ROLLBACK", (rollbackErr) => {
          if (rollbackErr) {
            console.error(
              "Error rolling back transaction:",
              rollbackErr.message
            );
          }
          res.status(500).json({ error: "Error updating client." });
        });
      } else {
        console.log(`Client with ID ${id} updated successfully`);
        // Commit transaction on success
        db.run("COMMIT", (commitErr) => {
          if (commitErr) {
            console.error("Error committing transaction:", commitErr.message);
            res.status(500).json({ error: "Error committing transaction." });
          } else {
            console.log("Transaction committed successfully");
            res.status(200).send(`Client with ID ${id} updated successfully`);
          }
        });
      }
    });
  });
};

const deleteClient = (req, res) => {
  //const id = req.body.id;
  const id = req.params.id;
  console.log(id);

  // Begin transaction
  db.run("BEGIN TRANSACTION", (beginErr) => {
    if (beginErr) {
      console.error("Error starting transaction:", beginErr.message);
      return res.status(500).json({ error: "Error starting transaction." });
    }

    // Delete contracts associated with the client
    const deleteContractsSQL = `DELETE FROM contract WHERE client_id = ?`;
    db.run(deleteContractsSQL, [id], (contractErr) => {
      if (contractErr) {
        // Rollback transaction in case of error
        db.run("ROLLBACK", (rollbackErr) => {
          if (rollbackErr) {
            console.error(
              "Error rolling back transaction:",
              rollbackErr.message
            );
          }
          return res.status(500).json({ error: "Error deleting contracts." });
        });
      } else {
        // Delete client
        const deleteClientSQL = `DELETE FROM client WHERE id = ?`;
        db.run(deleteClientSQL, [id], (clientErr) => {
          if (clientErr) {
            // Rollback transaction in case of error
            db.run("ROLLBACK", (rollbackErr) => {
              if (rollbackErr) {
                console.error(
                  "Error rolling back transaction:",
                  rollbackErr.message
                );
              }
              return res.status(500).json({ error: "Error deleting client." });
            });
          } else {
            // Commit transaction if no error
            db.run("COMMIT", (commitErr) => {
              if (commitErr) {
                console.error(
                  "Error committing transaction:",
                  commitErr.message
                );
                return res
                  .status(500)
                  .json({ error: "Error committing transaction." });
              }
              console.log(
                `Client with ID ${id} and associated contracts deleted successfully`
              );
              res.send(
                `Client with ID ${id} and associated contracts deleted successfully`
              );
            });
          }
        });
      }
    });
  });
};

module.exports = {
  insertClient,
  getAllClients,
  updateClient,
  deleteClient,
};
