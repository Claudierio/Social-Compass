"use client";

import Link from "next/link";
import { create } from "zustand";
import Navbar from "../../components/navbar";
import styles from "./postage.module.scss";
import React, { useState, useEffect } from "react";
import useStore from "../../(general)/stateZustand";
import Avatar from "@mui/material/Avatar";
import userAvatar from "/public/icons/user-avatar.png";
import { Box, Card, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";

//Interface para usuário
interface User {
  id: string;
  name: string;
  image: string;
}

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

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

const fetchUsers = async (): Promise<User[]> => {
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
      console.error("Informacoes de usuários nao obtidas", error);
    }
  }
  return [];
};

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

        const sortedPosts = data
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

        return sortedPosts;
      }
      //Comments
      if (response.ok) {
        const data = await response.json();

        // Map each post to include comments
        const postsWithComments = data.map((post: PostData) => ({
          ...post,
          comments: post.comments.map((comment: Comment) => ({
            id: comment.id,
            content: comment.content,
            author: {
              id: comment.author.id,
              name: comment.author.name,
              image: comment.author.image,
            },
            createdAt: comment.createdAt,
          })),
          createdAt: new Date(post.createdAt),
        }));
      } else {
        console.error("Informacoes dos posts nao obtidas", response.status);
      }
    } catch (error) {
      console.error("Erro ao obter informações dos posts:", error);
    }
  }
};

const calculateTimeElapsed = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = now.getTime() - createdDate.getTime();
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "dia" : "dias"} atrás`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hora" : "horas"} atrás`;
  } else {
    return `${minutes} ${minutes === 1 ? "minuto" : "minutos"} atrás`;
  }
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
  const [likeClickedMap, setLikeClickedMap] = useState<{
    [postId: string]: boolean;
  }>({});
  const [commentClickedMap, setCommentClickedMap] = useState<{
    [postId: string]: boolean;
  }>({});
  const [shareClickedMap, setShareClickedMap] = useState<{
    [postId: string]: boolean;
  }>({});

  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const addComment = (postId: string, comment: Comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment],
    }));
  };

  const addCommentRequest = async (postId: string, content: string) => {
    const token = localStorage.getItem("token");
    const authorId = localStorage.getItem("id"); // Substitua pelo ID do usuário logado

    if (token) {
      try {
        const response = await fetch(`http://localhost:3001/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
            authorId,
            postId,
          }),
        });

        if (response.ok) {
          const newComment = await response.json();
          addComment(postId, newComment);
        } else {
          console.error("Erro ao adicionar o comentário:", response.status);
        }
      } catch (error) {
        console.error("Erro ao adicionar o comentário:", error);
      }
    }
  };

  const handleCommentInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    postId: string
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const inputValue = (event.target as HTMLInputElement).value.trim();
      if (inputValue !== "") {
        await addCommentRequest(postId, inputValue);
        (event.target as HTMLInputElement).value = ""; // Limpa o input após adicionar o comentário
      }
    }
  };

  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await fetchPosts();
      if (Array.isArray(fetchedPosts) && fetchedPosts.length > 0) {
        setPosts(fetchedPosts);
      }
    };
    fetchData();
  }, []);

  const likePost = async (postId: string) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3001/posts/like/${postId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}), // Adiciona um corpo JSON vazio
          }
        );

        if (response.ok) {
          // Atualizar os posts após a curtida
          const updatedPosts = await fetchPosts();
          setPosts(updatedPosts);
        } else {
          console.error("Erro ao curtir o post:", response.status);
        }
      } catch (error) {
        console.error("Erro ao curtir o post:", error);
      }
    }
  };

  const handleLikeClick = async (postId: string) => {
    try {
      await likePost(postId);

      // Atualizar o estado para o post clicado
      setLikeClickedMap((prevMap) => ({
        ...prevMap,
        [postId]: true,
      }));
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Erro ao lidar com a curtida do post:", error);
    }
  };

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
      const usersInfo: User[] = await fetchUsers();
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

  const [showAllCommentsMap, setShowAllCommentsMap] = useState<{
    [postId: string]: boolean;
  }>({});

  const handleShowAllComments = (postId: string) => {
    setShowAllCommentsMap((prevMap) => ({
      ...prevMap,
      [postId]: !prevMap[postId],
    }));
  };

  const handleCommentClick = (postId: string) => {
    setCommentClickedMap((prevMap) => ({
      ...prevMap,
      [postId]: !prevMap[postId],
    }));
  };

  const handleShareClick = (postId: string) => {
    setShareClickedMap((prevMap) => ({
      ...prevMap,
      [postId]: !prevMap[postId],
    }));
  };
  const [likeCount, setLikeCount] = useState(0);

  return (
    <section style={{ marginTop: "10px", marginBottom: "100px" }}>
      <div className={styles.timeline}>
        {posts.map((postData, index) => (
          <Box key={index}>
            <section
              className={styles.timelinePost}
              style={isMobile ? mobileHomePostStyle : homePostStyle}
            >
              <div className={styles.container}>
                <div className={styles.postHeader}>
                  <div className={styles.avatarContainer}>
                    <Avatar
                      alt={postData.author.name}
                      src={postData.author.image}
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "16px",
                      }}
                    />
                    <div className={styles.postInfo}>
                      <div className={styles.nomeUser}>
                        <h4>{postData.author.name}</h4>
                      </div>
                      <div className={styles.postDate}>
                        <svg
                          className={styles.clock}
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M6 3V6H8.25M10.5 6C10.5 6.59095 10.3836 7.17611 10.1575 7.72208C9.93131 8.26804 9.59984 8.76412 9.18198 9.18198C8.76412 9.59984 8.26804 9.93131 7.72208 10.1575C7.17611 10.3836 6.59095 10.5 6 10.5C5.40905 10.5 4.82389 10.3836 4.27792 10.1575C3.73196 9.93131 3.23588 9.59984 2.81802 9.18198C2.40016 8.76412 2.06869 8.26804 1.84254 7.72208C1.6164 7.17611 1.5 6.59095 1.5 6C1.5 4.80653 1.97411 3.66193 2.81802 2.81802C3.66193 1.97411 4.80653 1.5 6 1.5C7.19347 1.5 8.33807 1.97411 9.18198 2.81802C10.0259 3.66193 10.5 4.80653 10.5 6Z"
                            stroke="#75767D"
                            stroke-width="0.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p className={styles.date}>
                          {calculateTimeElapsed(postData.createdAt)}
                          <span className={styles.location}>
                            {postData.location}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.postDescription}>
                    <p>{postData.text}</p>
                  </div>
                  <div className={styles.postImage}>
                    <img
                      src={postData.image}
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
                      likeClickedMap[postData.id] ? styles.clicked : ""
                    }`}
                    onClick={() => handleLikeClick(postData.id)}
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
                      Curtiu{" "}
                      <div
                        className={`${styles.numLikes} ${
                          likeClickedMap[postData.id] ? styles.clicked : ""
                        }`}
                        style={{
                          background: likeClickedMap[postData.id]
                            ? "#e9b425"
                            : "#A1A3A7",
                        }}
                      >
                        {postData.likes && `${postData.likes}`}
                      </div>
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
                      commentClickedMap[postData.id] ? styles.clicked : ""
                    }`}
                    onClick={() => handleCommentClick(postData.id)}
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
                      shareClickedMap[postData.id] ? styles.clicked : ""
                    }`}
                    onClick={() => handleShareClick(postData.id)}
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
                    style={{ marginTop: "16px" }}
                  >
                    <Avatar
                      alt={postData.author.name}
                      src={postData.author.image}
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "16px",
                      }}
                    />
                    <input
                      style={{ ...(isFocused && focusedStyle) }}
                      type="text"
                      name="text"
                      className={styles.inputPost}
                      placeholder="Tem algo a dizer?"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={(event) =>
                        handleCommentInputKeyDown(event, postData.id)
                      }
                    />
                  </div>

                  <div className={styles.allComments}>
                    <Typography>
                      Todos os comentários
                    </Typography>
                  </div>

                  <div className={styles.everyComments}>
                    {/* Renderiza o primeiro comentário, se existir */}
                    {postData.comments.length > 0 && (
                      <div className={styles.commentsPost}>
                        <Avatar
                          alt={postData.comments[0].author.name}
                          src={postData.comments[0].author.image}
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "16px",
                          }}
                        />
                        <Typography>
                          <span className={styles.userComment}>
                            {postData.comments[0].author.name}:
                          </span>
                          <span className={styles.descriComment}>
                            {postData.comments[0].content}
                          </span>
                        </Typography>
                      </div>
                    )}

                    <Divider
                      style={{ marginTop: "16px", background: "#A1A3A7",marginBottom: "16px" }}
                    />

                    {/* Renderiza o link "Ver todos os comentários" apenas se houver mais de um comentário */}
                    {postData.comments.length > 1 && (
                      <span
                        className={styles.everyCommentsText}
                        onClick={() => handleShowAllComments(postData.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {showAllCommentsMap[postData.id]
                          ? "Ver menos comentários"
                          : "Ver todos os comentários"}
                      </span>
                    )}
                  </div>

                  {/* Renderiza os comentários adicionais se o estado showAllCommentsMap indicar */}
                  {showAllCommentsMap[postData.id] && (
                    <>
                      {postData.comments
                        .slice(1)
                        .map((comment, commentIndex) => (
                          <div
                            key={commentIndex}
                            className={styles.commentsPost}
                          >
                            {/* Renderiza cada comentário adicional */}
                            <Avatar
                              alt={comment.author.name}
                              src={comment.author.image}
                              style={{
                                width: "32px",
                                height: "32px",
                                marginRight: "16px",
                              }}
                            />
                            <Typography>
                              <span className={styles.userComment}>
                                {comment.author.name}:
                              </span>
                              <span className={styles.descriComment}>
                                {comment.content}
                              </span>
                            </Typography>
                          </div>
                        ))}
                    </>
                  )}
                </div>

                <div className={styles.seeAllComments}>
                  {/* ... (mesmo código) */}
                </div>
              </div>
            </section>
          </Box>
        ))}
      </div>
    </section>
  );
};

export default Postage;
