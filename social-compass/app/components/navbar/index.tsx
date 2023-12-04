import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./Navbar.module.scss";
import global from "/public/icons/global.png";
import bell from "/public/icons/bell.png";
import goArrow from "/public/icons/goArrow.png";
import backArrow from "/public/icons/backArrow.png";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { Card, useMediaQuery } from "@mui/material";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";

const drawerWidth = 350;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: ` -${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface NavbarProps {
  open: boolean;
  selectedItem: string;
  modalOpen: boolean;
  setOpen: (value: boolean) => void;
  setSelectedItem: (item: string) => void;
  setModalOpen: (value: boolean) => void;
}

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

export default function NavBar({
  open,
  modalOpen,
  setOpen,
  setSelectedItem,
  setModalOpen,
}: NavbarProps) {
  const [nome, setNome] = useState("");
  const [image, setImage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();

      if (userInfo) {
        setNome(userInfo.name);
        setImage(userInfo.image);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (path: string, itemName: string) => {
    if (itemName === "Sair") {
      localStorage.clear();
      router.push("/login");
    } else {
      setSelectedItem(itemName);
      setModalOpen(false);
      setOpen(false);
      router.push(path);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setModalOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  return (
    <header className={styles.main}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              backgroundColor: "#17181c",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {modalOpen ? null : (
                <img
                  src={goArrow.src}
                  alt="Abrir menu"
                  style={{
                    width: isMobile ? "30px" : "50px",
                    height: isMobile ? "30px" : "50px",
                    cursor: "pointer",
                    marginRight: "16px",
                  }}
                  onClick={handleDrawerOpen}
                />
              )}

              <DrawerHeader>
                {open && (
                  <img
                    src={backArrow.src}
                    alt="Fechar menu"
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",
                      marginLeft: "16px",
                    }}
                    onClick={handleDrawerClose}
                  />
                )}
              </DrawerHeader>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontSize: 16,
                  "@media (max-width: 767px)": {
                    display: "none",
                  },
                  fontFamily: "MontSerrat",
                }}
              >
                Social Compass
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={global.src}
                alt="Planeta Icon"
                style={{
                  width: "25px",
                  height: "25px",
                  filter: "invert(100%)",
                  marginRight: "15px",
                }}
              />
              <img
                src={bell.src}
                alt="Sino Icon"
                style={{
                  width: "25px",
                  height: "25px",
                  filter: "invert(100%)",
                  marginRight: "15px",
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  marginRight: isMobile ? 0.9 : 2,
                  color: "white",
                  fontSize: isMobile ? "16px" : "16px",
                  fontFamily: "MontSerrat",
                }}
              >
                {nome}
              </Typography>
              <Link href="/profile" passHref>
                <StyledBadge
                /*                   overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot" */
                >
                  <Avatar
                    alt=""
                    src={image}
                    style={{
                      border: "1.5px solid #E9B425",
                      width: isMobile ? "34px" : "50px",
                      height: isMobile ? "34px" : "50px",
                      cursor: "pointer",
                    }}
                  />
                </StyledBadge>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            display: "flex",
            justifyContent: "center",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1E1F23",
              color: "white",
              "@media (max-width: 767px)": {
                width: "100%",
              },
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <img
            src="/compass-logo.png"
            alt="Login Home"
            style={{
              width: isMobile ? "250px" : "240px",
              marginLeft: isMobile ? 70 : 55,
            }}
          />
          <div
            className={styles.drawerContainer}
            style={{
              marginLeft: isMobile ? "75px" : " 55px",
            }}
          >
            <div className={styles.drawerLinksBox}>
              <Link
                href="/homepage"
                className={`${styles.drawerLink} ${styles.activeLink}`}
              >
                Página inicial
              </Link>
              <Link href="/profile" className={styles.drawerLink}>
                Meu Perfil
              </Link>
              <Link href="/marketplace" className={styles.drawerLink}>
                Marketplace
              </Link>
              <Link href="/" className={styles.drawerLink}>
                Sair
              </Link>
            </div>
          </div>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </header>
  );
}
