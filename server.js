require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./api/routes");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

routes(app);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
