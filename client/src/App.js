import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BanksPage from "./pages/banks/banks";
import BankCalculatorPage from "./pages/bank-calculator/bank-calculator";
import Layout from "./components/layout/layout";

function App() {
  const [banks, setBanks] = useState([]);

  const fetchBanks = async () => {
    const banks = await fetch("/api/banks").then((res) =>
      res.json()
    );
    setBanks(banks);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <BanksPage banks={banks} fetchBanks={fetchBanks} />
          </Route>
          <Route path="/calculator">
            <BankCalculatorPage banks={banks} fetchBanks={fetchBanks} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
