"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../stateZustand";
import Navbar from "../../components/navbar";
import styles from "./profile.module.scss";
import InfoProfile from "../../components/infoProfile";
import ModalProfile from "../../components/modalProfile";
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
import Divider from "@mui/material/Divider";
import Postage from "../../components/postage";

//Interfaces para o post
interface Author {
  id: string;
  name: string;
  image: string;
}

interface PostData {
  id: string;
  image: string;
  text: string;
  author: Author;
  location: string;
  createdAt: string;
  comments: Comment[];
  likes: string;
}

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
  const [posts, setPosts] = useState<PostData[]>([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`http://localhost:3001/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Filtrar apenas os posts do usuário logado
          const userId = localStorage.getItem("id");
          const userPosts = data.filter(
            (post: PostData) => post.author.id === userId
          );

          const sortedPosts = userPosts
            .map((post: PostData) => ({
              ...post,
              createdAt: new Date(post.createdAt),
            }))
            .sort((a: PostData, b: PostData) => {
              const dateA = new Date(a.createdAt).toISOString();
              const dateB = new Date(b.createdAt).toISOString();

              if (dateA < dateB) {
                return 1;
              } else if (dateA > dateB) {
                return -1;
              } else {
                return 0;
              }
            });

          setPosts(sortedPosts);
        } else {
          console.error("Informacoes dos posts nao obtidas", response.status);
        }
      } catch (error) {
        console.error("Erro ao obter informações dos posts:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
    };
    fetchData();
  }, []);

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
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "600",
                      wordBreak: "break-word",
                      width: isMobile ? "100%" : "380%",
                      fontSize: isMobile ? 21 : 30,
                    }}
                  >
                    {name}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      width: isMobile ? "150%" : "250%",
                    }}
                  >
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
                      marginTop: isMobile ? "50px" : "-35px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#000000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#FFFFFF")
                    }
                  >
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
        <div className={styles.containerProfile}>
          <InfoProfile />
          <div className={styles.postscontainer}>
            <div className={styles.followrs}>
              <Card
                sx={{
                  display: "flex",
                  color: "#E9B425",
                  width: isMobile ? "300px" : "1050px",
                  background: "transparent",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: 16,
                    fontWeight: "50",
                    marginLeft: isMobile ? 0.5 : 50,
                    cursor: "pointer",
                  }}
                >
                  Followers
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: 16,
                    fontWeight: "50",
                    marginLeft: isMobile ? 3 : 10,
                    cursor: "pointer",
                  }}
                >
                  Following
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: isMobile ? 3 : 10,
                    cursor: "pointer",
                  }}
                >
                  Posts
                </Typography>
              </Card>
            </div>
            <Postage />
          </div>
        </div>
        <Card />
      </ThemeProvider>
    </div>
  );
};

export default profile;
