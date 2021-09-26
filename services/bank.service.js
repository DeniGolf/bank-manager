const db = require("../db/db");

class BankService {
  async createBank(req, res) {
    const { name, interestRate, maximumLoan, minimumDownPayment, loanTerm } =
      req.body;

    const newBank = await db.query(
      `INSERT INTO bank (name, interest_rate, maximum_loan, minimum_down_payment, loan_term) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, interestRate, maximumLoan, minimumDownPayment, loanTerm]
    );

    res.json(newBank.rows[0]);
  }

  async getBank(req, res) {
    const bankId = req.params.id;
    const bank = await db.query("SELECT * FROM bank WHERE id = $1", [bankId]);

    res.json(bank.rows[0]);
  }

  async getBanks(req, res) {
    const banks = await db.query("SELECT * FROM bank ORDER BY id");

    const mappedBanks = banks.rows.map((bank) => ({
      id: bank.id,
      name: bank.name,
      interestRate: bank.interest_rate,
      maximumLoan: bank.maximum_loan,
      minimumDownPayment: bank.minimum_down_payment,
      loanTerm: bank.loan_term,
    }));

    res.json(mappedBanks);
  }

  async updateBank(req, res) {
    const bankId = req.params.id;
    const { name, interestRate, maximumLoan, minimumDownPayment, loanTerm } =
      req.body;

    const bank = await db.query(
      "UPDATE bank SET name = $1, interest_rate = $2, maximum_loan = $3, minimum_down_payment = $4, loan_term = $5 WHERE id = $6 RETURNING *",
      [name, interestRate, maximumLoan, minimumDownPayment, loanTerm, bankId]
    );

    res.json(bank.rows[0]);
  }

  async deleteBank(req, res) {
    const bankId = req.params.id;
    const bank = await db.query("DELETE FROM bank WHERE id = $1", [
      bankId.toString(),
    ]);

    res.json(bank.rows[0]);
  }
}

module.exports = new BankService();
