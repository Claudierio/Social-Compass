"use client";
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
import { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import dataIcon from "/public/icons/lock.png";
import nomeIcon from "/public/icons/lock.png";
import cargoIcon from "/public/icons/lock.png";
import generoIcon from "/public/icons/lock.png";
import enderecoIcon from "/public/icons/lock.png";
import telefoneIcon from "/public/icons/lock.png";
import { useRouter } from "next/navigation";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import useStore from "../stateZustand";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

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

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  
  const [username, setUsername] = useState("");

  const [cargo, setCargo] = useState("");
  const [sexo, setSexo] = useState("");

  const [date, setDate] = useState("");

  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    cargo: "",
    sexo: "",
    date: "",
    endereco: "",
    telefone: "",
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();
      if (open) {
        if (userInfo) {
          setUsername(userInfo.name);
          setCargo(userInfo.occupation);
          setSexo(userInfo.sex);
          setDate(
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

  const router = useRouter();

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
      username: "",
      cargo: "",
      sexo: "",
      date: "",
      endereco: "",
      telefone: "",
      url: "",
    });

    /* Validações para o Telefone */

    if (!telefone) {
      setErrors((errors) => ({
        ...errors,
        telefone: "Telefone é obrigatório. ",
      }));
      isValid = false;
    }
    /* Validações para o Telefone */

    if (!sexo) {
      setErrors((errors) => ({
        ...errors,
        sexo: "Sexo é obrigatório. ",
      }));
      isValid = false;
    }
    /* Validações para a profissao */

    if (!url) {
      setErrors((errors) => ({
        ...errors,
        url: "Url da imagem é obrigatória. ",
      }));
      isValid = false;
    } else {
      const pattern = /\.(jpeg|jpg|png|webp)$/;
      if (!pattern.test(url)) {
        setErrors((errors) => ({
          ...errors,
          url: "A URL deve ser de uma imagem válida (jpeg, jpg, png, webp).",
        }));
        isValid = false;
      }
    }

    /* Validações para a profissao */

    if (!cargo) {
      setErrors((errors) => ({
        ...errors,
        cargo: "Cargo é obrigatório. ",
      }));
      isValid = false;
    }

    if (cargo.length > 255) {
      setErrors((errors) => ({
        ...errors,
        cargo: "Cargo não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    /* Validações para o genero */
    if (!sexo) {
      setErrors((errors) => ({
        ...errors,
        sexo: "Gênero é obrigatório. ",
      }));
      isValid = false;
    }

    if (sexo.length > 255) {
      setErrors((errors) => ({
        ...errors,
        sexo: "Gênero não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    /* Validações para o username */
    if (!username) {
      setErrors((errors) => ({
        ...errors,
        username: "Nome é obrigatório. ",
      }));
      isValid = false;
    }

    if (username.length > 255) {
      setErrors((errors) => ({
        ...errors,
        username: "Nome não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    /* Validações para o endereço */
    if (!endereco) {
      setErrors((errors) => ({
        ...errors,
        endereco: "Endereço é obrigatório. ",
      }));
      isValid = false;
    }

    if (endereco.length > 255) {
      setErrors((errors) => ({
        ...errors,
        endereco: "Endereço não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    /* Validações para o telefone */
    if (!telefone) {
      setErrors((errors) => ({
        ...errors,
        telefone: "Telefone é obrigatório. ",
      }));
      isValid = false;
    }

    if (telefone.length > 255) {
      setErrors((errors) => ({
        ...errors,
        telefone: "Telefone não pode ter mais de 255 caracteres. ",
      }));
      isValid = false;
    }

    /* Validações para a data de date */
    let formattedDate = "";
    if (!date) {
      setErrors((errors) => ({
        ...errors,
        date: "Data de Nascimento é obrigatória.",
      }));
      isValid = false;
    } else {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = date.match(dateRegex);

      if (!match) {
        setErrors((errors) => ({
          ...errors,
          date:
            "Por favor, insira uma data válida no formato dd/mm/aaaa.",
        }));
        isValid = false;
      } else {
        const [, day, month, year] = match;

        formattedDate = `${year}-${month}-${day}`;
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
            name: username,
            occupation: cargo,
            sex: sexo,
            birthdate: formattedDate,
            address: endereco,
            phone: telefone,
            image: url,
          }),
        });

        if (response.ok) {
          /*  router.push("/perfil"); */
          window.location.reload();
        } else {
          /*         console.log("ID:    " + userId);
          console.log("TOKEN:    " + token); */
          console.error("Update Falhou");
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
      console.log(formattedDate);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Nunito",
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={nomeIcon.src}
                        alt="Nome Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.username
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.username && styles.errorBorder,
                    notchedOutline: errors.username
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.username ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.username ? "#E9B425" : "#757575",
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
                        src={cargoIcon.src}
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
                        src={generoIcon.src}
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
                value={date}
                onChange={(e) => setDate(applyDateMask(e.target.value))}
                error={!!errors.date}
                helperText={errors.date}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={dataIcon.src}
                        alt="Data Icon"
                        style={{
                          width: "20px",
                          height: "20px",
                          filter: errors.date
                            ? "brightness(0) saturate(100%) invert(94%) sepia(39%) saturate(7165%) hue-rotate(331deg) brightness(93%) contrast(95%)"
                            : "invert(100%)",
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { color: "#FFFFFF" },
                  classes: {
                    root: errors.date && styles.errorBorder,
                    notchedOutline: errors.date
                      ? styles.errorBorder
                      : styles.whiteBorder,
                  },
                }}
                InputLabelProps={{
                  style: { color: errors.date ? "#E9B425" : "#757575" },
                }}
                FormHelperTextProps={{
                  style: {
                    color: errors.date ? "#E9B425" : "#757575",
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
                        src={enderecoIcon.src}
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
                        src={telefoneIcon.src}
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
                        src={nomeIcon.src}
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
                  background:
                    "linear-gradient(180deg, #2e2f36 0%, #17181c 100%),linear-gradient(0deg, #17181c, #17181c)",

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
                  background:
                    "linear-gradient(45deg, #ad2d14 30%, #f42e07 90%)",
                  color: "#ffffff",
                  borderRadius: "35px",
                  marginTop: "10px",
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
export default ProfileModal;