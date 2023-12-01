import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useStore from "../../(general)/stateZustand";
import styles from "./Navbar.module.scss";
import userAvatar from "/public/icons/user-avatar.png";
import global from "/public/icons/global.png";
import bell from "/public/icons/bell.png";
import goArrow from "/public/icons/goArrow.png";
import backArrow from "/public/icons/backArrow.png";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

interface NavbarProps {
  open: boolean;
  selectedItem: string;
  modalOpen: boolean;
  setOpen: (value: boolean) => void;
  setSelectedItem: (item: string) => void;
  setModalOpen: (value: boolean) => void;
}

export default function PersistentDrawerLeft({
  open,
  selectedItem,
  modalOpen,
  setOpen,
  setSelectedItem,
  setModalOpen,
}: NavbarProps) {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
    setModalOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  const handleItemClick = (text: string) => {
    setSelectedItem(text);
  };

  return (
    <header className={styles.main}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              backgroundColor: "#1E1F23",
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
                    width: "50px",
                    height: "50px",
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

              <Typography variant="h6" noWrap component="div">
                Social Compass
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={global.src}
                alt="Global Icon"
                style={{
                  width: "35px",
                  height: "35px",
                  filter: "invert(100%)",
                  marginRight: "5px",
                }}
              />
              <img
                src={bell.src}
                alt="Bell Icon"
                style={{
                  width: "35px",
                  height: "35px",
                  filter: "invert(100%)",
                  marginRight: "5px",
                }}
              />

              <Typography
                variant="body1"
                sx={{ marginRight: 2, color: "white" }}
              >
                Nome do Usuário
              </Typography>
              <Avatar
                alt="Remy Sharp"
                src={userAvatar.src}
                style={{
                  width: "55px",
                  height: "55px",
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1E1F23",
              color: "white",
              alignItems: "center",
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
              width: "240px",
              height: "75.782px",
            }}
          />

          <div className={styles.drawerContainer}>
            <div className={styles.drawerLinksBox}>
              <Link
                href="/homepage"
                className={`${styles.drawerLink} ${styles.activeLink}`}
              >
                Página inicial
              </Link>
              <Link href="/" className={styles.drawerLink}>
                Meu Perfil
              </Link>
              <Link href="/" className={styles.drawerLink}>
                Marktplace
              </Link>
              <Link href="/" className={styles.drawerLink}>
                Sair
              </Link>
            </div>
          </div>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
          <h1>teste</h1>
        </Main>
      </Box>
    </header>
  );
}
