import React, { useEffect, useState } from "react";
import useStore from "../../(general)/stateZustand";
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
  Box,
  Card,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
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

const InfoProfile = () => {
  const [sexo, setSexo] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const { modalOpen } = useStore();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cardMarginLeft = modalOpen ? "-50%" : "-57.5%";
  const homePostStyle = {
    width: modalOpen ? "calc(100% - 330px)" : "100%",
    marginLeft: modalOpen ? "330px" : "0",
  };

  const getMonthName = (monthIndex: number) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[monthIndex];
  };

  const formatSex = (sex: string) => {
    switch (sex) {
      case "Male":
        return "Masculino";
      case "Female":
        return "Feminino";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let isMounted = true;
      const userInfo = await getUserInfo();
      const dateObject = new Date(userInfo.birthdate);
      const day = dateObject.getDate();
      const monthName = getMonthName(dateObject.getMonth());
      const year = dateObject.getFullYear();

      if (userInfo) {
        setTelefone(userInfo.phone);
        setEmail(userInfo.email);
        setEndereco(userInfo.address);
        setNascimento(`Nascido em ${day} de ${monthName}, ${year}`);

        if (userInfo && isMounted) {
          const formattedSex = formatSex(userInfo.sex);
          setSexo(formattedSex);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <section style={homePostStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "",
            justifyContent: "center",
            p: isMobile ? 1 : 4,
            marginTop: isMobile ? 2 : -4,
          }}
        >
          <Card
            sx={{
              position: "relative",
              width: isMobile ? "400" : 368,
              borderRadius: 4,
              height: 410,

              marginLeft: isMobile ? "" : cardMarginLeft,
              border: "2px solid #97979b",
              color: "white",

              background: "linear-gradient(0deg, #1E1F23, #2E2F36)",
            }}
            elevation={5}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "600",
                wordBreak: "break-word",
                padding: 2,
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 3,
                fontSize: isMobile ? 18 : 22,
              }}
            >
              Sobre
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingLeft: 2.8,
                paddingBottom: 5,
              }}
            >
              <PersonIcon/>
              <Typography variant="subtitle1">{sexo}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingBottom: 5,
                paddingLeft: 2.8,
              }}
            >
              <CakeIcon/>
              <Typography variant="subtitle1">{nascimento}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingBottom: 5,
                paddingLeft: 2.8,
              }}
            >
              <PlaceIcon />
              <Typography variant="subtitle1">{endereco}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingLeft: 3,
                paddingBottom: 5,
              }}
            >
              <EmailIcon />
              <Typography variant="subtitle1">{email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                paddingLeft: 2.8,
              }}
            >
              <LocalPhoneIcon />
              <Typography variant="subtitle1">{telefone}</Typography>
            </Box>
          </Card>
          <Box
            sx={{
              mt: 2,
              ml: 5,
              width: isMobile ? "80%" : "20%",
            }}
          >
          </Box>
        </Box>
      </section>
    </ThemeProvider>
  );
};

export default InfoProfile;
