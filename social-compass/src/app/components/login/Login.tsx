"use client";

import wallpaper from "/public/compass-login.png";
import React from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

const Login = () => {
  return (
    <div>
      <Grid container style={{}}>
        <Grid item xs={6}>
          <Paper elevation={4} style={{ textAlign: "center", height: "100%" }}>
            <Typography
              variant="h1"
              style={{
                fontFamily: "arial",
                fontSize: "4rem",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Olá,
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontFamily: "arial",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
              }}
            >
              Para continuar navegando de forma segura, efetue o login.
            </Typography>
            <Typography variant="h2">Login</Typography>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                label="Email"
                margin="normal"
                InputProps={{
                  style: {
                    width: "25.375rem",
                    height: "3.85rem",
                    padding: "1.1875rem 1.5rem",
                    borderRadius: "2.875rem",
                    border: "2px",
                  },
                }}
              />
              <TextField
                label="Senha"
                type="password"
                margin="normal"
                InputProps={{
                  style: {
                    width: "25.375rem",
                    height: "3.85rem",
                    padding: "1.1875rem 1.5rem",
                    borderRadius: "2.875rem",
                    border: "2px",
                  },
                }}
              />
              <Button
                variant="contained"
                style={{
                  width: "25.375rem",
                  height: "3.85rem",
                  padding: "1.1875rem 1.5rem",
                  borderRadius: "2.875rem",
                  border: "2px none",
                  backgroundColor: "#FE2E05",
                }}
              >
                Entrar
              </Button>

              <Typography>
                Novo por aqui?
                <Link href="#">Registre-se </Link>
              </Typography>
            </form>
          </Paper>
        </Grid>

        {/* Imagem Wallpaper */}
        <Grid
          item
          xs={6}
          style={{
            backgroundImage: `url(${wallpaper.src})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        ></Grid>
      </Grid>
    </div>
  );
};

export default Login;
