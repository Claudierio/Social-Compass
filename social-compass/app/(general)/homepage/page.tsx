"use client";

import Link from "next/link";
import { create } from "zustand";
import styles from "./Homepage.module.scss";
import React, { useEffect, useState, ChangeEvent } from "react";
import Navbar from "../../components/navbar";
import Postage from "../../components/postage";
import useStore from "../stateZustand";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import userAvatar from "/public/icons/user-avatar.png";
import { Box, Card } from "@mui/material";

interface User {
  id: string;
  name: string;
  image: string;
}

interface PostData {
  text: string;
  location: string;
  image: string;
  authorId: string;
}

const defaultPostData: PostData = {
  text: "",
  location: "",
  image: "",
  authorId: "",
};

const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch(`http://localhost:3001/users/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const usersData: User[] = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          image: user.image,
        }));
        return usersData;
      }
    } catch (error) {
      console.error("Erro ao obter informações dos usuários:", error);
    }
  }
  return [];
};

const getUserInfo = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  if (token && userId) {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",

          Authorization: ` Bearer ${token}`,
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

const HomePage = () => {
  const {
    open,
    selectedItem,
    modalOpen,
    setOpen,
    setSelectedItem,
    setModalOpen,
  } = useStore();

  const homePostStyle = {
    width: modalOpen ? "calc(80% - 350px)" : "80%",
    marginLeft: modalOpen ? "350px" : "0",
  };

  const mobileHomePostStyle = {
    width: "110%",
    marginLeft: "-4%",
  };

  const [users, setUsers] = useState<User[]>([]);
  const [isScrollNeeded, setIsScrollNeeded] = useState(false);
  const fetchData = async () => {
    try {
      const usersInfo: User[] = await getUsers();
      setUsers(usersInfo);
    } catch (error) {
      console.error("Erro ao obter informações dos usuários:", error);
    }
  };

  //post
  const [image, setImage] = useState<string>("");
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [postData, setPostData] = useState<PostData>(defaultPostData);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();

      if (userInfo) {
        setImage(userInfo.image);
        setLoggedInUserId(userInfo.id);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPostData((prevState) => ({ ...prevState, image: value }));
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPostData((prevState) => ({ ...prevState, location: value }));
  };

  const handlePostClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedPostData = { ...postData, authorId: loggedInUserId };

      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPostData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Post enviado com sucesso:", responseData);
        setPostData(defaultPostData);
      } else {
        console.error("Falha ao enviar post:", response.status);
      }
    } catch (error) {
      console.error("Erro ao processar o envio do post:", error);
    }
  };

  //-------------

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIsScrollNeeded(users.length > 4);
  }, [users]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );

  const focusedStyle = {
    border: "0.8px solid gray",
    padding: "9.6px 14.4px",
  };
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [likeClicked, setLikeClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);

  const handleLikeClick = () => {
    setLikeClicked(!likeClicked);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const handleCommentClick = () => {
    setCommentClicked(!commentClicked);
  };

  const handleShareClick = () => {
    setShareClicked(!shareClicked);
  };

  const [likeCount, setLikeCount] = useState(0);

  const [showSecondInput, setShowSecondInput] = useState(false);
  const [showThirdInput, setShowThirdInput] = useState(false);

  const [showAdditionalInputs, setShowAdditionalInputs] = useState({
    photo: false,
    map: false,
  });

  const handlePhotoClick = () => {
    setShowAdditionalInputs((prev) => ({
      ...prev,
      photo: !prev.photo,
    }));
  };

  const handleMapClick = () => {
    setShowAdditionalInputs((prev) => ({
      ...prev,
      map: !prev.map,
    }));
  };

  return (
    <Card
      style={{
        background: "#17181c",
      }}
    >
      <div className={styles.mainContent}>
        <Navbar
          open={open}
          selectedItem={selectedItem}
          modalOpen={modalOpen}
          setOpen={setOpen}
          setSelectedItem={setSelectedItem}
          setModalOpen={setModalOpen}
        />

        <section
          className={styles.homePost}
          style={isMobile ? mobileHomePostStyle : homePostStyle}
        >
          <div className={styles.container}>
            <div className={styles.avatarContainer}>
              <Avatar
                alt="Avatar"
                src={userAvatar.src}
                style={{
                  width: "32px",
                  height: "32px",
                  marginRight: "16px",
                }}
              />
              <input
                style={{
                  fontFamily: "MontSerrat",
                  background: "transparent",
                  border: "1px solid gray",
                  color: "white",
                  padding: "10px 15px",
                  outline: "none",
                  ...(isFocused && focusedStyle),
                }}
                type="text"
                name="text"
                className={styles.inputPost}
                placeholder="No que você está pensando?"
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            {showAdditionalInputs.photo && (
              <input
                style={{
                  fontFamily: "MontSerrat",
                  background: "transparent",
                  border: "1px solid gray",
                  color: "white",
                  padding: "10px 15px",
                  outline: "none",
                  width: "100%",
                  ...(isFocused && focusedStyle),
                  marginTop: "10px",
                }}
                type="text"
                name="image"
                className={styles.inputPost}
                onChange={handleImageChange}
                placeholder="Escreva a URL da sua imagem aqui"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            )}

            {showAdditionalInputs.map && (
              <input
                style={{
                  fontFamily: "MontSerrat",
                  background: "transparent",
                  border: "1px solid gray",
                  color: "white",
                  padding: "10px 15px",
                  outline: "none",
                  width: "100%",
                  ...(isFocused && focusedStyle),
                  marginTop: "10px",
                }}
                type="text"
                name="location"
                className={styles.inputPost}
                placeholder="Onde você está?"
                onChange={handleLocationChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            )}

            <svg
              className={styles.faPhoto}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              color="#75767D"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>

            <svg
              className={styles.faImg}
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleMapClick}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              color="#75767D"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <svg
              className={styles.faClip}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              color="#75767D"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>

            <svg
              className={styles.faMap}
              onClick={handlePhotoClick}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              color="#75767D"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            <svg
              className={styles.faSmile}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              color="#75767D"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>

            <div className={styles.buttonPost}>
              <button
                type="submit"
                className={styles.containerButton}
                onClick={handlePostClick}
              >
                Postar
              </button>
            </div>
          </div>
        </section>

        <Postage />

        <div className={styles.accordions}>
          <div>
            <Accordion
              style={{
                width: "272px",
                borderRadius: "16px",
                border: "2px solid var(--gray-gray-600, #2E2F36)",
                background: "var(--gray-gray-700, #1E1F23)",
                display: "block",
                color: "white",
                maxHeight: isScrollNeeded ? "270px" : "none",
              }}
              className={isScrollNeeded ? styles.scrollHidden : ""}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ color: "white" }}>Meus amigos</Typography>
              </AccordionSummary>
              {users.map((user, index) => (
                <AccordionDetails
                  key={index}
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  <Avatar
                    alt={user.name}
                    src={user.image}
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "10px",
                      marginTop: "-5px",
                    }}
                  />
                  <Typography>{user.name}</Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          </div>

          <div className={styles.accordionsContainer}>
            <Accordion
              style={{
                width: "272px",
                borderRadius: "16px",
                border: "2px solid var(--gray-gray-600, #2E2F36)",
                background: "var(--gray-gray-700, #1E1F23)",
                marginTop: "20px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: "white",
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ color: "white" }}>
                  Itens em Destaque{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={""}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "16px",
                  }}
                />
                <div className={styles.productInfo}>
                  <Typography>Armário Grande</Typography>
                  <Typography className={styles.productPrice}>
                    R$ 500,00
                  </Typography>
                </div>
              </AccordionDetails>
              <AccordionDetails
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={""}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "16px",
                  }}
                />
                <div className={styles.productInfo}>
                  <Typography>Armário Grande</Typography>
                  <Typography className={styles.productPrice}>
                    R$ 500,00
                  </Typography>
                </div>
              </AccordionDetails>
              <AccordionDetails
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={""}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "16px",
                  }}
                />
                <div className={styles.productInfo}>
                  <Typography>Armário Grande</Typography>
                  <Typography className={styles.productPrice}>
                    R$ 500,00
                  </Typography>
                </div>
              </AccordionDetails>
              <AccordionDetails
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={""}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "16px",
                  }}
                />
                <div className={styles.productInfo}>
                  <Typography>Armário Grande</Typography>
                  <Typography className={styles.productPrice}>
                    R$ 500,00
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HomePage;
