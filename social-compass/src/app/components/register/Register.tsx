"use client";

import React from "react";
import loginPhoto from "/public/compass-login.png";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function Login() {
  return (
    <Container component="main">
      <Grid container>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h1">Olá,</Typography>
            <Typography variant="body1">
              Por favor, registre-se para continuar.
            </Typography>
            <Typography variant="h2">Cadastro</Typography>
            <form>
              <TextField label="Nome" fullWidth margin="normal" />
              <TextField label="Usuário" fullWidth margin="normal" />
              <TextField label="Nascimento" fullWidth margin="normal" />
              <TextField label="Email" fullWidth margin="normal" />
              <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Confirmar senha"
                type="password"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" fullWidth>
                Entrar
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid
          item
          xs={6}
          style={{
            backgroundImage: `url(${loginPhoto.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}></Grid>
      </Grid>
    </Container>
  );
}