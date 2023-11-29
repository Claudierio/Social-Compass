"use client";

import React, { useState } from "react";
import iconPerson from "/public/icons/person.png";
import iconFinger from "/public/icons/fingerprint.png";
import iconCalendar from "/public/icons/calendar.png";
import iconAt from "/public/icons/at.png";
import iconLock from "/public/icons/lock.png";
import iconshieldcheck from "/public/icons/shieldcheck.png";
import Link from "next/link";
import styles from "./Register.module.scss";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  InputAdornment,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const [email, setEmail] = useState("");

  const [date, setDate] = useState("");
  //const [labelVisible, setLabelVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

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
    }
  };

  const checkUsernameUnique = async (username: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  };

  return (
    <div className={styles.main}>
      <Grid className={styles.main} container>
        <Grid className={styles.main} item sm={6} style={{ padding: 20 }}>
          <Paper
            elevation={0}
            className={styles.main}
            sx={{
              marginBottom: 20,
              marginRight: 20,
              marginLeft: 20,
              marginTop: 10,
              padding: 3,
              maxWidth: 400,
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
                        src={iconPerson.src}
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
                    notchedOutline: styles.whiteBorder,
                  },
                }}
                InputLabelProps={{ style: { color: "#757575" } }}
              />
              <TextField
                label="Usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.username}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={iconFinger.src}
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
                    notchedOutline: styles.whiteBorder,
                  },
                }}
                InputLabelProps={{ style: { color: "#757575" } }}
              />

              <TextField
                label={"Nascimento"}
                value={date}
                onChange={handleInputChange}
                type="nascimento"
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={iconCalendar.src}
                        alt="Senha Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFF" },
                  classes: {
                    notchedOutline: styles.whiteBorder,
                  },
                  inputProps: {
                    className: styles.whiteIcon,
                  },
                }}
                InputLabelProps={{ style: { color: "#757575" } }}
              />
              <TextField
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={iconAt.src}
                        alt="Senha Icon"
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
                    notchedOutline: styles.whiteBorder,
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
                        src={iconLock.src}
                        alt="Senha Icon"
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
                InputLabelProps={{
                  style: { color: errors.password ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: { color: errors.password ? "#E9B425" : "#757575" },
                }}
              />
              <TextField
                label="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
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
                        src={iconshieldcheck.src}
                        alt="Senha Icon"
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
                  Já possui uma conta?{" "}
                  <Link className={styles.loginLink} href="/login">
                    <span>Faça login</span>
                  </Link>
                </span>
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
