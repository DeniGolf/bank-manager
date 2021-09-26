import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function BankCard({ bank, handleDelete, fetchBanks }) {
  const [open, setOpen] = useState(false);
  const [bankInput, setBankInput] = useState({
    name: bank.name,
    interestRate: bank.interestRate,
    maximumLoan: bank.maximumLoan,
    minimumDownPayment: bank.minimumDownPayment,
    loanTerm: bank.loanTerm,
  });
  const [errors, setErrors] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setBankInput({ ...bankInput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors({});
    
    const errors = {};

    if (!bankInput.name) {
      errors.name = "Empty value is not allowed.";
    }

    if (!bankInput.interestRate) {
      errors.interestRate = "Empty value is not allowed.";
    }

    if (!bankInput.maximumLoan) {
      errors.maximumLoan = "Empty value is not allowed.";
    }

    if (!bankInput.minimumDownPayment) {
      errors.minimumDownPayment = "Empty value is not allowed.";
    }

    if (!bankInput.loanTerm) {
      errors.loanTerm = "Empty value is not allowed.";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    if (bankInput.name) {
      await fetch(`/api/banks/${bank.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(bankInput),
      });

      handleClose();
      fetchBanks();
    }
  };

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          action={
            <div>
              <IconButton onClick={() => handleDelete(bank.id)}>
                <DeleteOutlined />
              </IconButton>
              <IconButton onClick={() => handleOpen(bank.id)}>
                <EditOutlinedIcon />
              </IconButton>
            </div>
          }
          title={bank.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Interest rate: {bank.interestRate}%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Maximum loan: ${bank.maximumLoan}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Minimum down payment: ${bank.minimumDownPayment}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Loan term: {bank.loanTerm} months
          </Typography>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Edit bank
          </Typography>

          <Stack
            spacing={2}
            component="form"
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <TextField
              error={!!errors?.name}
              helperText={errors?.name}
              label="Name"
              variant="outlined"
              name="name"
              value={bankInput.name}
              onChange={handleChange}
            />
            <TextField
              error={!!errors?.interestRate}
              helperText={errors?.interestRate}
              label="Interest rate"
              variant="outlined"
              name="interestRate"
              value={bankInput.interestRate}
              onChange={handleChange}
              type="number"
            />
            <TextField
              error={!!errors?.maximumLoan}
              helperText={errors?.maximumLoan}
              label="Maximum loan"
              variant="outlined"
              name="maximumLoan"
              value={bankInput.maximumLoan}
              onChange={handleChange}
              type="number"
            />
            <TextField
              error={!!errors?.minimumDownPayment}
              helperText={errors?.minimumDownPayment}
              label="Minimum down payment"
              variant="outlined"
              name="minimumDownPayment"
              value={bankInput.minimumDownPayment}
              onChange={handleChange}
              type="number"
            />
            <TextField
              error={!!errors?.loanTerm}
              helperText={errors?.loanTerm}
              label="Loan term"
              variant="outlined"
              name="loanTerm"
              value={bankInput.loanTerm}
              onChange={handleChange}
              type="number"
            />

            <Button
              type="submit"
              variant="contained"
              endIcon={<KeyboardArrowRightOutlinedIcon />}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
