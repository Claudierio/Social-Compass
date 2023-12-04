"use client";

import Link from "next/link";
import { create } from "zustand";
import Navbar from "../../components/navbar";
import styles from "./postage.module.scss";
import React, { useState, useEffect } from "react";
import useStore from "../../(general)/stateZustand";
import Avatar from "@mui/material/Avatar";
import userAvatar from "/public/icons/user-avatar.png";
import { Box, Card } from "@mui/material";
import Divider from "@mui/material/Divider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";

interface User {
  id: string;
  name: string;
  image: string;
}

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

const Postage = () => {
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


  return (
         <section style={{ marginTop: "10px", marginBottom: "100px" }}>
          <div className={styles.timeline}>
            <Box>
              <section
                className={styles.timelinePost}
                style={isMobile ? mobileHomePostStyle : homePostStyle}
              >
                <div className={styles.container}>
                  <div className={styles.postHeader}>
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
                      <div className={styles.postInfo}>
                        <div className={styles.nomeUser}>
                          <h4 style={{ color: "white", fontWeight: 500 }}>
                            Nome de usuário
                          </h4>
                        </div>
                        <div className={styles.postDate}>
                          <p className={styles.date}>
                            12 minutos atrás em{" "}
                            <span style={{ color: "white", fontWeight: 500 }}>
                              Paisagens Exuberantes
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.postDescription}>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda, unde? Dignissimos, at consequatur quo, est
                        eius inventore dolores culpa quisquam dolorum quidem nam
                        velit doloremque hic. Nihil hic laborum omnis?
                      </p>
                    </div>

                    <div className={styles.postImage}>
                      <img
                        src="/postExample.png"
                        alt="imagePost"
                        style={{
                          width: "100%",
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.postInteraction}>
                    <div
                      className={`${styles.postLike} ${
                        likeClicked ? styles.clicked : ""
                      }`}
                      onClick={handleLikeClick}
                    >
                      <span
                        className={styles.likeText}
                        id="likeText"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ThumbUpIcon
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "5px",
                          }}
                        />
                        Curtiu {likeCount > 0 && `(${likeCount})`}
                      </span>
                      <div className={styles.likesBadge} id="likesBadge">
                        <span
                          className={styles.likesNumber}
                          id="likesNumber"
                        ></span>
                      </div>
                    </div>

                    <div
                      className={`${styles.postComment} ${
                        commentClicked ? styles.clicked : ""
                      }`}
                      onClick={handleCommentClick}
                    >
                      <span
                        className={styles.commentText}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ChatIcon
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "5px",
                          }}
                        />
                        Comentários
                      </span>
                      <div className={styles.commentsBadge}>
                        <span className={styles.commentsNumber}></span>
                      </div>
                    </div>

                    <div
                      className={`${styles.postShare} ${
                        shareClicked ? styles.clicked : ""
                      }`}
                      onClick={handleShareClick}
                    >
                      <span
                        className={styles.shareText}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ShareIcon
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "5px",
                          }}
                        />
                        Compartilhar
                      </span>
                    </div>
                  </div>

                  <div className={styles.postComments}>
                    <div
                      className={styles.avatarContainer}
                      style={{
                        marginTop: "16px",
                      }}
                    >
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
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    </div>

                    <div className={styles.everyComments}>
                      <span className={styles.everyCommentsText}>
                        Todos os comentários
                      </span>
                    </div>

                    <Divider
                      style={{ marginTop: "16px", background: "#A1A3A7" }}
                    />

                    <div className={styles.seeAllComments}>
                      <p
                        className={styles.seeAllCommentsText}
                        style={{ marginTop: "16px", cursor: "pointer" }}
                      >
                        Ver todos os comentários
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Box>
          </div>
        </section>
  )
}

export default Postage;