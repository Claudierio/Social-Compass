"use client";

import React from "react";
import { useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import useStore from "../../(general)/stateZustand";
import { useRouter } from "next/navigation";
import styles from "./modalMarket.module.scss";
import List from "/public/icons/list.png";
import Textident from "/public/icons/textident.png";
import Money from "/public/icons/money.png";
import Image from "/public/icons/image.png";
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

const ModalMarket: React.FC<ModalProfileProps> = ({ open, onClose }) => {
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
                Adicionar Item
              </Typography>
              <TextField
                label="Nome do item"
                fullWidth
                margin="dense"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={List.src}
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
                label="Descrição"
                fullWidth
                margin="dense"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={Textident.src}
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
                label="Preço"
                fullWidth
                margin="dense"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={Textident.src}
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
                label="Imagem"
                fullWidth
                margin="dense"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={Image.src}
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

              <Button
                type="reset"
                fullWidth
                className={styles.buttonCancel}
                sx={{
                  background:
                    "linear-gradient(180deg, #2e2f36 0%, #17181c 120%),linear-gradient(0deg, #17181c, #17181c)",
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
export default ModalMarket;
