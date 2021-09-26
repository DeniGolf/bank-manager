const bankRouter = require("./bank-route");
const calculateRouter = require("./calculate-route");

const routes = (app) => {
  app.use("/api/banks", bankRouter);
  app.use("/api/calculates", calculateRouter);
};

module.exports = routes;
