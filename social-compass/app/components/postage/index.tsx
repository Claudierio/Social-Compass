"use client";

import Link from "next/link";
import { create } from "zustand";
import styles from "./postage.module.scss";
import React, { useState } from "react";
import useStore from "../../(general)/stateZustand";
import Avatar from "@mui/material/Avatar";
import userAvatar from "/public/icons/user-avatar.png";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";

const {
    open,
    selectedItem,
    modalOpen,
    setOpen,
    setSelectedItem,
    setModalOpen,
  } = useStore();

  const homePostStyle = {
    width: modalOpen ? "calc(75% - 350px)" : "75%",
    marginLeft: modalOpen ? "350px" : "0",
  };

  const isMobile = window.innerWidth <= 767;

  const mobileHomePostStyle = {
    width: "92%",
    marginLeft: "-5%",
  };

  const [inputValue, setInputValue] = useState("No que você está pensando?");

  const [likeClicked, setLikeClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);

  const handleLikeClick = () => {
    setLikeClicked(!likeClicked);
  };

  const handleCommentClick = () => {
    setCommentClicked(!commentClicked);
  };

  const handleShareClick = () => {
    setShareClicked(!shareClicked);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

const index = () => {
  return (
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
                  <p
                    style={{
                      color: "var(--gray-gray-300, #75767D)",
                      fontWeight: 500,
                    }}
                  >
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
                Assumenda, unde? Dignissimos, at consequatur quo, est eius
                inventore dolores culpa quisquam dolorum quidem nam velit
                doloremque hic. Nihil hic laborum omnis?
              </p>
            </div>

            <div className={styles.postImage}>
              <img
                src="/compass-logo.png"
                alt="imagePost"
                style={{
                  width: "100%",
                  maxWidth: "100vh",
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
              <span className={styles.likeText} id="likeText">
                Curtiu
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
              <span className={styles.commentText}>Comentários</span>
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
              <span className={styles.shareText}>Compartilhar</span>
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
                type="text"
                value={inputValue}
                onChange={handleChange}
                className={styles.textBox}
              />
            </div>

            <div className={styles.everyComments}>
              <span className={styles.everyCommentsText} >
                Todos os comentários
              </span>
            </div>

            <Divider  style={{marginTop:"16px"}} />

            <div className={styles.seeAllComments}>
              <p className={styles.seeAllCommentsText} style={{marginTop:"16px", cursor: "pointer"}}>
                Ver todos os comentários
              </p>
            </div>
          </div>
          
        </div>
      </section>
    </Box>
  </div>
  )
}

export default index