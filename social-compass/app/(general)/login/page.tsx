"use client";

import React, { useState } from "react";
import nomeIcon from "/public/icons/person.png";
import senhaIcon from "/public/icons/lock.png";
import Link from "next/link";
import styles from "./Login.module.scss";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    const checkUsernameUnique = async (username: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    };

    setErrors({ username: "", password: "" });

    if (password.length < 6 || password.length > 50) {
      setErrors((errors) => ({
        ...errors,
        password: "Senha deve ter entre 6 e 50 caracteres.",
      }));
      isValid = false;
    }

    if (username.length > 255) {
      setErrors((errors) => ({
        ...errors,
        username: "Usuário não pode ter mais de 255 caracteres.",
      }));
      isValid = false;
    }

    if (isValid) {
      const isUnique = await checkUsernameUnique(username);
      if (!isUnique) {
        setErrors((errors) => ({ ...errors, username: "Usuário já existe." }));
        isValid = false;
      }
    }

    if (isValid) {
      console.log(username, password);
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "User-Agent": "PostmanRuntime/7.35.0",
            Accept: "/",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            Origin: "http://localhost:3000/",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          const userId = data.user.id;
          localStorage.setItem("token", token);
          localStorage.setItem("id", userId);
          router.push("/homepage");
        } else {
          setErrors((errors) => ({
            ...errors,
            username: " ",
            password:
              "Usuário e/ou Senha inválidos." +
              "\n" +
              "Por favor, tente novamente!",
          }));
          isValid = false;
        }
      } catch (error) {
        console.error("Ocorreu um erro: ", error);
      }
    }
  };

  return (
    <div className={styles.main}>
      <Grid className={styles.main} container>
        <Grid className={styles.main} item sm={6} style={{ padding: 20 }}>
          <Paper
            elevation={0}
            className={styles.main}
            sx={{
              marginBottom: { xs: "160px", sm: "20px" },
              marginRight: { xs: "160px", sm: "20px" },
              marginLeft: { xs: "-20px", sm: "220px" },
              marginTop: { xs: "120px", sm: "140px" },
              padding: { xs: "24px", sm: "3" },
              maxWidth: { xs: "342px", sm: "400px" },
              color: "white",
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <Typography variant="h2" gutterBottom>
              Olá,
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Para continuar navegando de forma segura, efetue o login.
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginLeft: 0.3, fontSize: 27 }}
            >
              Login
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                label="Nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.username}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={nomeIcon.src}
                        alt="Nome Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.password && styles.errorBorder,
                    notchedOutline: errors.password
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{ style: { color: "#757575" } }}
              />
              <TextField
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={senhaIcon.src}
                        alt="Senha Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: "invert(100%)",
                          color: "white",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFF" },
                  classes: {
                    root: errors.password && styles.errorBorder,
                    notchedOutline: errors.password
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.password ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: { color: errors.password ? "#E9B425" : "#757575" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                className={styles.buttonRegister}
                fullWidth
              >
                Entrar
              </Button>

              <div className={styles.parentContainer}>
                <span className={styles.loginContainer}>
                  Novo por aqui?{" "}
                  <Link className={styles.loginLink} href="/register">
                    <span>Registre-se</span>
                  </Link>
                </span>
              </div>
              <div>
              </div>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <img
            src="/compass-login.png"
            alt="Login Home"
            style={{ width: "100%", maxWidth: "100vh", margin: 0, padding: 0 }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
