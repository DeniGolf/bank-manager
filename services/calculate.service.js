const db = require("../db/db");

class CalculateService {
  async createCalculateByBankId(req, res) {
    const { initialLoan, downPayment, monthlyPayment } = req.body;

    const bankId = req.params.id;

    const newBank = await db.query(
      `INSERT INTO calculate (bank_id, initial_loan, down_payment, monthly_payment) VALUES ($1, $2, $3, $4) RETURNING *`,
      [bankId, initialLoan, downPayment, monthlyPayment]
    );

    res.json(newBank.rows[0]);
  }

  async getCalculatesByBankId(req, res) {
    const bankId = req.params.id;

    const bankCalculates = await db.query(
      "SELECT * FROM calculate WHERE bank_id = $1",
      [bankId]
    );

    const mappedBankCalculates = bankCalculates.rows.map((calculate) => ({
      id: calculate.id,
      initialLoan: calculate.initial_loan,
      downPayment: calculate.down_payment,
      monthlyPayment: calculate.monthly_payment,
    }));

    res.json(mappedBankCalculates);
  }
}

module.exports = new CalculateService();
