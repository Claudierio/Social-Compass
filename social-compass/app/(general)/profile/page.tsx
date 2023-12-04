"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../stateZustand";
import Navbar from "../../components/navbar";
import styles from "./profile.module.scss";
import InfoProfile from "../../components/infoProfile";
import ModalProfile from "../../components/modalProfile";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import {
  Card,
  CardMedia,
  Avatar,
  Button,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
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

const profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    open,
    selectedItem,
    modalOpen,
    setOpen,
    setSelectedItem,
    setModalOpen,
  } = useStore();
  const cardMarginLeft = modalOpen ? "1%" : "";

  const homePostStyle = {
    width: modalOpen ? "calc(100% - 330px)" : "100%",
    marginLeft: modalOpen ? "330px" : "0",
  };

  const mobileHomePostStyle = {
    width: "110%",
    marginLeft: "-4%",
  };

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push("/login");
    }
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setName(userInfo.name);
        setOffice(userInfo.occupation);
        setAvatar(userInfo.image);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.profileMain}>
      <Navbar
        open={open}
        selectedItem={selectedItem}
        modalOpen={modalOpen}
        setOpen={setOpen}
        setSelectedItem={setSelectedItem}
        setModalOpen={setModalOpen}
      />
      <ThemeProvider theme={theme}>
        <section style={homePostStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: isMobile ? 1 : 4,
              marginLeft: isMobile ? "" : cardMarginLeft,
              pt: isMobile ? 0 : 2,
            }}
          >
            <Card
              sx={{
                position: "relative",
                marginTop: isMobile ? 5 : 0,
                borderRadius: 4,
                height: isMobile ? 380 : 400,
                width: isMobile ? 380 : "100%",

                border: "2px solid #97979b",
                background: "linear-gradient(0deg, #1E1F23, #2E2F36)",
              }}
              elevation={5}
            >
              <CardMedia
                sx={{
                  borderRadius: 4,
                }}
                component="img"
                height={isMobile ? "250" : "280"}
                image={
                  isMobile ? "/profileWallpaper.png" : "/profileWallpaper.png"
                }
                alt="Capa do perfil"
              />


              <Avatar
                alt="Imagem do Perfil"
                src={avatar}
                sx={{
                  width: isMobile ? 150 : 180,
                  height: isMobile ? 150 : 180,
                  position: "absolute",
                  border: "2px solid #E9B425",
                  top: isMobile ? 130 : 150,
                  left: isMobile ? 15 : 60,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: isMobile ? 2 : 5,
                  pl: isMobile ? 23 : 27,
                  pb: isMobile ? 1 : 2,

                  pr: 2,
                }}
              >
                <Box
                  sx={{
                    pb: 2,
                    pr: 2,

                    color: "#E9B425",
                    width: isMobile ? "140px" : "30",
                  }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "600",
                      wordBreak: "break-word",
                      width: isMobile ? "100%" : "380%",

                      fontSize: isMobile ? 21 : 30,
                    }}>
                    {name}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      width: isMobile ? "150%" : "250%",
                    }}>
                    {office}
                  </Typography>
                </Box>
                <div>
                  <Button
                    type="submit"
                    className={styles.buttonEdit}
                    onClick={() => setIsModalOpen(true)}
                    sx={{
                      ml: isMobile ? -40 : 120,
                      background:
                        "linear-gradient(45deg, #ad2d14 30%, #f42e07 90%)",
                      color: "#ffffff",
                      borderRadius: "35px",
                      height: " 54px",
                      marginTop: isMobile ? "50px" : "-35px",
                      textTransform: "none",
                      fontWeight: "bold",
                      transition: "color 0.3s",
                      width: "140px",
                      fontSize: "15px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#000000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#FFFFFF")
                    }>
                    Editar Perfil
                  </Button>
                  <ModalProfile
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                </div>
              </Box>
            </Card>
          </Box>
        </section>
        <InfoProfile />
      </ThemeProvider>
    </div>
  );
};

export default profile;
