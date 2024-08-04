const express = require("express");
const db = require("./dbconnection");
const multer = require("multer");
const cors = require("cors");
const path = require("path"); // Import the path module

const {
  getAllClients,
  insertClient,
  updateClient,
  deleteClient,
} = require("/home/yassine/Documents/internship/cmm/backend/controllers /client.js");
const { createClientTable } = require("./models/client");
const { createContractTable } = require("./models/contract");
const {
  getAllContracts,
} = require("/home/yassine/Documents/internship/cmm/backend/controllers /contract.js");
const app = express();

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello there");
});
createClientTable();
createContractTable();

app.get("/addclient", (req, res) => {
  res.sendFile(
    "/home/yassine/Documents/internship/cmm/backend/views/form.html"
  );
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Preserve original file extension
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/clients", getAllClients);
app.post("/client", upload.single("file"), insertClient);
app.put("/client", updateClient);
app.delete("/client/:id", deleteClient);
app.get("/contracts", getAllContracts);
app.listen(Port, console.log(`listening on port ${Port}...`));
