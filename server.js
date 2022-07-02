const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
require("dotenv")

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: DB_USER,
      // TODO: Add MySQL password here
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    console.log(`Connected to the company_db database.`)
  );

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});