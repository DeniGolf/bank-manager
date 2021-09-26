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
  let url = path.join(__dirname, "/client/build", "index.html");
  if (!url.startsWith("/app/")) url = url.substring(1);
  res.sendFile(url);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
