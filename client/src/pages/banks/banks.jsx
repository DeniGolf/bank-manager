import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BankCard from "../../components/bank-card/bank-card";
import CreateBank from "../../components/create-bank/create-bank";

export default function BanksPage({ banks, fetchBanks }) {
  const handleDelete = async (id) => {
    await fetch(`/api/banks/${id}`, {
      method: "DELETE",
    });

    fetchBanks();
  };

  return (
    <Container>
      <CreateBank fetchBanks={fetchBanks} />
      <Grid container spacing={3}>
        {banks.map((bank) => (
          <Grid item xs={12} md={6} lg={4} key={bank.id}>
            <BankCard
              fetchBanks={fetchBanks}
              bank={bank}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
