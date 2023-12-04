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
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const [email, setEmail] = useState("");

  const [date, setDate] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };


  const applyDateMask = (value: string) => {
    let cleanValue = value.replace(/\D/g, "");

    let day = cleanValue.slice(0, 2);
    let month = cleanValue.slice(2, 4);
    let year = cleanValue.slice(4, 8);

    if (day.length === 2) {
      const dayNum = parseInt(day, 10);
      if (dayNum < 1 || dayNum > 31) {
        day = "31";
      }
    }

    if (month.length === 2) {
      const monthNum = parseInt(month, 10);
      if (monthNum < 1 || monthNum > 12) {
        month = "12";
      }
    }

    if (year.length === 4) {
      const yearNum = parseInt(year, 10);
      if (yearNum < 1900) {
        year = "1900";
      } else if (yearNum > 2023) {
        year = "2023";
      }
    }

    cleanValue = [day, month, year].filter(Boolean).join("/");
    return cleanValue;
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    setErrors({
      username: "",
      password: "",
    });

    if (user.length > 255) {
      setErrors((errors) => ({
        ...errors,
        nome: "Nome não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    if (user.length < 3) {
      setErrors((errors) => ({
        ...errors,
        nome: "Nome não pode ser nulo. ",
      }));
      isValid = false;
    }

    if (!user) {
      setErrors((errors) => ({
        ...errors,
        nome: "Nome é obrigatório. Por favor, preencha este campo",
      }));
      isValid = false;
    }

    if (username.length > 255) {
      setErrors((errors) => ({
        ...errors,
        username: "Usuário não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    } else if (!username) {
      setErrors((errors) => ({
        ...errors,
        username: "Usuário é obrigatório. Por favor, preencha este campo",
      }));
      isValid = false;
    }

    let formattedDate = "";
    if (!date) {
      setErrors((errors) => ({
        ...errors,
        nascimento: "Data de Nascimento é obrigatória. Por favor, preencha este campo",
      }));
      isValid = false;
    } else {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = date.match(dateRegex);

      if (!match) {
        setErrors((errors) => ({
          ...errors,
          nascimento:
            "O formato válido para a data é dd/mm/aaaa.. Por favor, preencha este campo corretamente",
        }));
        isValid = false;
      } else {
        const [, day, month, year] = match;

        formattedDate = `${year}-${month}-${day}`;
      }
    }


    if (email.length === 0) {
      setErrors((errors) => ({ ...errors, email: "E-mail é obrigatório. Por favor, preencha este campo" }));
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors((errors) => ({
        ...errors,
        email: "Por favor, insira um e-mail válido.",
      }));
      isValid = false;
    }


    if (!password || !confirmPassword) {
      setErrors((errors) => ({
        ...errors,
        password: "Senha é obrigatório.",
        confirmPassword: "Confirmar a senha é obrigatório.",
      }));
      isValid = false;
    }

    if (password.length < 6 || password.length > 50) {
      setErrors((errors) => ({
        ...errors,
        password: "Senha deve ter entre 6 e 50 caracteres.",
      }));
      isValid = false;
    }

    if (confirmPassword !== password) {
      setErrors((errors) => ({
        ...errors,
        password: " ",
        confirmPassword: "As senhas não correspondem.",
      }));
      isValid = false;
    }


    if (isValid) {
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",

            "User-Agent": "PostmanRuntime/7.35.0",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
          body: JSON.stringify({
            name: user,
            username,
            birthdate: formattedDate,
            email,
            password,
            confirmPassword,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          const userId = data.user.id;

          localStorage.setItem("token", token);
          localStorage.setItem("id", userId);
          router.push("/homepage");
        } else {
          console.error("Registro Falhou");
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
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
              marginLeft: { xs: "-20px", sm: "260px" },
              marginTop: { xs: "-10px", sm: "60px" },
              padding: { xs: "24px", sm: "3" },
              maxWidth: { xs: "342px", sm: "400px" },
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
              Registre-se
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
                label={"Nascimento"}
                value={date}
                onChange={(e) => setDate(applyDateMask(e.target.value))}
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
                label="Email"
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
                Registrar-se
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
