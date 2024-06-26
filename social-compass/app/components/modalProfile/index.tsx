"use client";

import React from "react";
import { useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import useStore from "../../(general)/stateZustand";
import { useRouter } from "next/navigation";
import styles from "./modalProfile.module.scss";
import person from "/public/icons/person.png";
import identify from "/public/icons/identity.png";
import dna from "/public/icons/dna.png";
import calendar from "/public/icons/calendar.png";
import point from "/public/icons/point.png";
import tel from "/public/icons/tel.png";
import {
  Button,
  Card,
  InputAdornment,
  Modal,
  TextField,
  ThemeProvider,
  Slide,
  Typography,
  createTheme,
  useMediaQuery,
  MenuItem,
} from "@mui/material";

interface ModalProfileProps {
  open: boolean;
  onClose: () => void;
}

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
});

const SlideTransition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getUserInfo = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  if (token && userId) {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
    }
  }
};

const ModalProfile: React.FC<ModalProfileProps> = ({ open, onClose }) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [sexo, setSexo] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({
    nome: "",
    cargo: "",
    sexo: "",
    nascimento: "",
    endereco: "",
    telefone: "",
    url: "",
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();
      if (open) {
        if (userInfo) {
          setNome(userInfo.name);
          setCargo(userInfo.occupation);
          setSexo(userInfo.sex);
          setNascimento(
            new Date(userInfo.birthdate).toLocaleDateString("pt-BR")
          );
          setEndereco(userInfo.address);
          setTelefone(userInfo.phone);
          setUrl(userInfo.image);
          setId(userInfo.id);
        }
      }
    };

    fetchData();
  }, [open]);

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
      if (yearNum < 1923) {
        year = "1923";
      } else if (yearNum > 2023) {
        year = "2023";
      }
    }

    cleanValue = [day, month, year].filter(Boolean).join("/");
    return cleanValue;
  };

  const applyPhoneMask = (value: string) => {
    let cleanValue = value.replace(/\D+/g, "");
    let areaCode = cleanValue.slice(0, 2);
    let firstPart = cleanValue.slice(2, 7);
    let secondPart = cleanValue.slice(7, 11);
    cleanValue = `${areaCode ? "(" + areaCode : ""}${
      firstPart ? ") " + firstPart : ""
    }${secondPart ? "-" + secondPart : ""}`;

    if (cleanValue.endsWith(") ") && secondPart === "") {
      cleanValue = cleanValue.slice(0, -2);
    } else if (cleanValue.endsWith("-") && secondPart === "") {
      cleanValue = cleanValue.slice(0, -1);
    }

    return cleanValue;
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    setErrors({
      nome: "",
      cargo: "",
      sexo: "",
      nascimento: "",
      endereco: "",
      telefone: "",
      url: "",
    });

    if (!nome) {
      setErrors((errors) => ({
        ...errors,
        nome: "Nome não pode ser nulo. Por favor, preencha esse campo",
      }));
      isValid = false;
    } else if (nome.length > 255) {
      setErrors((errors) => ({
        ...errors,
        nome: "Nome não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    if (!cargo) {
      setErrors((errors) => ({
        ...errors,
        cargo: "Cargo não pode ser nulo. Por favor, preencha esse campo",
      }));
      isValid = false;
    } else if (cargo.length > 255) {
      setErrors((errors) => ({
        ...errors,
        cargo: "Cargo não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    if (!sexo) {
      setErrors((errors) => ({
        ...errors,
        sexo: "Sexo não pode ser nulo. Por favor, preencha esse campo",
      }));
      isValid = false;
    }

    if (!endereco) {
      setErrors((errors) => ({
        ...errors,
        endereco: "Endereço não pode ser nulo. Por favor, preencha esse campo",
      }));
      isValid = false;
    } else if (endereco.length > 255) {
      setErrors((errors) => ({
        ...errors,
        endereco: "Endereço não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    let formattedDate = "";
    if (!nascimento) {
      setErrors((errors) => ({
        ...errors,
        nascimento:
          "Data de Nascimento não pode ser nula. Por favor, preencha esse campo.",
      }));
      isValid = false;
    } else {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = nascimento.match(dateRegex);

      if (!match) {
        setErrors((errors) => ({
          ...errors,
          nascimento:
            "Por favor, insira uma data válida no formato dd/mm/aaaa.",
        }));
        isValid = false;
      } else {
        const [, day, month, year] = match;
        const birthDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        if (age > 100) {
          setErrors((errors) => ({
            ...errors,
            nascimento: "A idade não pode ser superior a 100 anos.",
          }));
          isValid = false;
        } else {
          formattedDate = `${year}-${month}-${day}`;
        }
      }
    }

    if (!telefone) {
      setErrors((errors) => ({
        ...errors,
        telefone: "Telefone não pode ser nulo. Por favor, preencha esse campo",
      }));
      isValid = false;
    } else if (telefone.length > 255) {
      setErrors((errors) => ({
        ...errors,
        telefone: "Telefone não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    if (!url) {
      setErrors((errors) => ({
        ...errors,
        url: "Url não pode ser nula. Por favor, preencha esse campo",
      }));
      isValid = false;
    } else {
      const pattern = /\.(jpeg|jpg|png|webp)$/;
      if (!pattern.test(url)) {
        setErrors((errors) => ({
          ...errors,
          url: "A URL deve ser de uma imagem válida, ex: png, jpg, jpeg, webp.",
        }));
        isValid = false;
      }
    }

    if (isValid) {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: nome,
            occupation: cargo,
            sex: sexo,
            birthdate: formattedDate,
            address: endereco,
            phone: telefone,
            image: url,
          }),
        });

        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Update Falhou");
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          top: "8%",
          left: isMobile ? "fit-content" : "37.5%",
          width: isMobile ? "fit-content" : "400px",
        }}
      >
        <SlideTransition in={open} timeout={500}>
          <Card
            className={styles.modalContent}
            sx={{
              paddingLeft: "30px",
              paddingRight: "30px",
              background: "#17181c",
              color: "white",
              borderRadius: "20px",
              paddingBottom: "20px",
              margin: isMobile ? "10px" : "0px",
            }}
          >
            <form onSubmit={handleUpdate}>
              <Typography
                variant="h4"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 1,
                  paddingBottom: 2,
                }}
              >
                Editar Perfil
              </Typography>
              <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.nome}
                helperText={errors.nome}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={person.src}
                        alt="Nome Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.nome
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.nome && styles.errorBorder,
                    notchedOutline: errors.nome
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.nome ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.nome ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              />
              <TextField
                label="Cargo/Profissão"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.cargo}
                helperText={errors.cargo}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={identify.src}
                        alt="Cargo Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.cargo
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.cargo && styles.errorBorder,
                    notchedOutline: errors.cargo
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.cargo ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.cargo ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              />
              <TextField
                select
                label="Sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.sexo}
                helperText={errors.sexo}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={dna.src}
                        alt="Gênero Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.sexo
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.sexo && styles.errorBorder,
                    notchedOutline: errors.sexo
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.sexo ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.sexo ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              >
                <MenuItem value="Male">Masculino</MenuItem>
                <MenuItem value="Female">Feminino</MenuItem>
              </TextField>
              <TextField
                label="Data de Nascimento"
                fullWidth
                margin="dense"
                value={nascimento}
                onChange={(e) => setNascimento(applyDateMask(e.target.value))}
                error={!!errors.nascimento}
                helperText={errors.nascimento}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={calendar.src}
                        alt="Data Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.nascimento
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.nascimento && styles.errorBorder,
                    notchedOutline: errors.nascimento
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.nascimento ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.nascimento ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              />
              <TextField
                label="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.endereco}
                helperText={errors.endereco}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={point.src}
                        alt="Endereço Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.endereco
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.endereco && styles.errorBorder,
                    notchedOutline: errors.endereco
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.endereco ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.endereco ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              />
              <TextField
                label="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(applyPhoneMask(e.target.value))}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.telefone}
                helperText={errors.telefone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={tel.src}
                        alt="Telefone Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.telefone
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.telefone && styles.errorBorder,
                    notchedOutline: errors.telefone
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.telefone ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.telefone ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              />
              <TextField
                label="Imagem de perfil (URL)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.url}
                helperText={errors.url}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={person.src}
                        alt="Imagem URL Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.url
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.url && styles.errorBorder,
                    notchedOutline: errors.url
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.url ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.url ? "#E9B425" : "#757575",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  },
                }}
              />
              <Button
                type="reset"
                fullWidth
                className={styles.buttonCancel}
                sx={{
                  background: "linear-gradient(180deg, #2e2f36 0%, #17181c 120%),linear-gradient(0deg, #17181c, #17181c)",
                  color: "#ffffff",
                  borderRadius: "35px",
                  marginTop: "10px",
                  height: "50px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "color 0.3s",
                  fontSize: "15px",
                }}
                onClick={onClose}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                fullWidth
                className={styles.buttonEdit}
                sx={{
                  background: "linear-gradient(45deg, #ad2d14 30%, #f42e07 90%)",
                  color: "#ffffff",
                  borderRadius: "35px",
                  marginTop: "24px",
                  height: "50px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "color 0.3s",
                  fontSize: "15px",
                }}
              >
                Salvar
              </Button>
            </form>
          </Card>
        </SlideTransition>
      </Modal>
    </ThemeProvider>
  );
};
export default ModalProfile;
