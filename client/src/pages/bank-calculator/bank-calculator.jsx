import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function BankCalculator({ banks }) {
  const [currentBank, setCurrentBank] = useState({});
  const [calculates, setCalculates] = useState([]);
  const [calculatorInput, setCalculatorInput] = useState({
    initialLoan: "",
    downPayment: "",
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState();

  const handleSelectBank = (event) => {
    const bankId = +event.target.value;
    const bank = banks.find((item) => item.id === bankId);

    setCurrentBank(bank);
    fetchCalculates(bankId);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCalculatorInput((calculatorInput) => ({
      ...calculatorInput,
      [name]: value,
    }));
  };

  const fetchCalculates = async (bankId) => {
    const calculates = await fetch(
      `/api/calculates/${bankId}`
    ).then((res) => res.json());

    setCalculates(calculates);
  };

  const handleCalculate = async () => {
    const { interestRate, loanTerm, minimumDownPayment, maximumLoan } =
      currentBank;

    setErrors({});
    setResult("");

    const errors = {};

    if (calculatorInput.initialLoan > maximumLoan) {
      errors.initialLoan = `Maximum loan for this bank - $${maximumLoan}`;
    }

    if (calculatorInput.downPayment < minimumDownPayment) {
      errors.downPayment = `Minimum down payment for this bank - $${minimumDownPayment}`;
    }

    if (!Object.keys(currentBank).length) {
      errors.currentBank = "Empty value is not allowed.";
    }

    if (!calculatorInput.initialLoan) {
      errors.initialLoan = "Empty value is not allowed.";
    }

    if (!calculatorInput.downPayment) {
      errors.downPayment = "Empty value is not allowed.";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const TO_PERCENT = 100;
    const interestRatePercent = interestRate / TO_PERCENT;

    const result =
      (calculatorInput.initialLoan *
        ((interestRatePercent / 12) *
          (1 + interestRatePercent / 12) ** loanTerm)) /
      ((1 + interestRatePercent / 12) ** loanTerm - 1);

    await fetch(`/api/calculates/${currentBank.id}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...calculatorInput, monthlyPayment: result }),
    });

    setResult(result);

    await fetchCalculates(currentBank.id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Stack spacing={2} sx={{ width: "49%" }}>
        <FormControl fullWidth error={!!errors?.currentBank}>
          <InputLabel>Bank</InputLabel>
          <Select
            id="select"
            label="Bank"
            onChange={handleSelectBank}
            defaultValue=""
          >
            {banks.map((bank) => (
              <MenuItem key={bank.id} value={bank.id}>
                {bank.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors?.currentBank}</FormHelperText>
        </FormControl>

        <TextField
          error={!!errors?.initialLoan}
          helperText={errors?.initialLoan}
          label="Initital loan"
          variant="outlined"
          name="initialLoan"
          value={calculatorInput.initialLoan}
          onChange={handleChange}
          type="number"
        />

        <TextField
          error={!!errors?.downPayment}
          helperText={errors?.downPayment}
          label="Down payment"
          variant="outlined"
          name="downPayment"
          value={calculatorInput.downPayment}
          onChange={handleChange}
          type="number"
        />
        <p>Result: {result}</p>
        <Button
          type="submit"
          variant="contained"
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </Stack>

      {calculates.length ? (
        <Box sx={{ width: "49%" }}>
          <Typography variant="h5" gutterBottom component="div">
            History:
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Initial loan</TableCell>
                  <TableCell>Down payment</TableCell>
                  <TableCell>Monthly payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calculates.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.initialLoan}</TableCell>
                    <TableCell>{row.downPayment}</TableCell>
                    <TableCell>{row.monthlyPayment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
    </Box>
  );
}

export default BankCalculator;
