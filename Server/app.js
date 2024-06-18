require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const port = process.env.PORT;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
