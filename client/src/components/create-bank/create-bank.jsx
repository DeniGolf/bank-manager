import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

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
};

export default function CreateBank({ fetchBanks }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bankInput, setBankInput] = useState({
    name: "",
    interestRate: "",
    maximumLoan: "",
    minimumDownPayment: "",
    loanTerm: "",
  });
  const [errors, setErrors] = useState({});

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

    await fetch(`/api/banks`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(bankInput),
    });

    setBankInput({
      name: "",
      interestRate: "",
      maximumLoan: "",
      minimumDownPayment: "",
      loanTerm: "",
    });

    handleClose();
    fetchBanks();
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Button
          sx={{ alignSelf: "end", mb: 2 }}
          variant="contained"
          onClick={handleOpen}
        >
          Create bank
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create bank
            </Typography>
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
    </Box>
  );
}
