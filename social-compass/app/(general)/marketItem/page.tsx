"use client";
import * as React from "react";
import styles from "./marktItem.module.scss";
import { Button, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import userAvatar from "/public/icons/user-avatar.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MarktItem = () => {
  const item = {
    id: 1,
    title: "Produto 1",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    price: "R$ 300,00",
    status: "Ainda não vendido",
    image: "/marketImage_wallpaper.png",
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.main}
    style={{
      background: "#17181c",
      marginTop: "-40px",
      paddingTop: "30px"

    }}
    >
      <div className={styles.itemDetails}>
        <Typography variant="h1" className={styles.pageTitle}>
          Detalhes do Item
        </Typography>
      </div>

      <div className={styles.infos}>
        <div className={styles.imageContainer}>
          <img src={item.image} alt={item.title} />
        </div>

        <div className={styles.itemInfo}>
          <div className={styles.options}>
            <Typography
              variant="h2"
              className={styles.itemTitle}
              style={{
                color: "#fff",
                fontFamily: "Inter",
                fontSize: "48px",
                fontWeight: 500,
                textAlign: "left",
                lineHeight: "100%",
              }}
            >
              {item.title}
            </Typography>

            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{
                color: "white",
              }}
            >
              <MoreHorizIcon
               />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              className={styles.customMenu}
            >
              <MenuItem onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.3103 6.87842L17.1216 2.68873C16.9823 2.5494 16.8169 2.43888 16.6349 2.36348C16.4529 2.28808 16.2578 2.24927 16.0608 2.24927C15.8638 2.24927 15.6687 2.28808 15.4867 2.36348C15.3047 2.43888 15.1393 2.5494 15 2.68873L3.43969 14.25C3.2998 14.3888 3.18889 14.554 3.11341 14.736C3.03792 14.918 2.99938 15.1132 3.00001 15.3103V19.5C3.00001 19.8978 3.15804 20.2793 3.43935 20.5606C3.72065 20.8419 4.10218 21 4.50001 21H8.6897C8.88675 21.0006 9.08197 20.9621 9.26399 20.8866C9.44602 20.8111 9.61122 20.7002 9.75001 20.5603L21.3103 8.99998C21.4496 8.86069 21.5602 8.69531 21.6356 8.5133C21.711 8.33129 21.7498 8.13621 21.7498 7.9392C21.7498 7.74219 21.711 7.5471 21.6356 7.36509C21.5602 7.18308 21.4496 7.01771 21.3103 6.87842ZM18 10.1887L13.8103 5.99998L16.0603 3.74998L20.25 7.93873L18 10.1887Z"
                    fill="#E9B425"
                  />
                </svg>
                Editar
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z"
                    fill="#FE2E05"
                  />
                </svg>
                Deletar
              </MenuItem>
            </Menu>
          </div>

          <Typography
            className={styles.itemDescription}
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "24px",
              letterSpacing: "-0.14px",
              color: "var(--gray-gray-200, #A1A3A7)",
              marginBottom: "8px",
              textAlign: "left",
            }}
          >
            {item.description}
          </Typography>

          <Typography
            className={styles.itemPrice}
            style={{
              marginTop: "30px",
              color: "var(--gray-gray-200, #A1A3A7)",
              fontFamily: "Inter",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px",
              letterSpacing: "-0.24px",
            }}
          >
            {item.price}
          </Typography>

          <Typography
            style={{
              marginTop: "30px",
              width: "150px",
              borderRadius: "24px",
              background: "var(--gray-gray-200, #A1A3A7)",
              padding: "4px 12px",
              gap: "10px",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "24px",
              color: "var(--white, #F5F5F5)",
              cursor: "pointer",
            }}
          >
            {item.status}
          </Typography>

          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              className={`${styles.buttonRegister} ${styles.addButtonMargin}`}
              style={{
                display: "flex;",
                padding: "16px 24px",
                alignItems: "flex-start",
                borderRadius: "46px",
                border: "1px solid var(--orange, #FE2E05)",
                background: "var(--gradient-button, linear-gradient(180deg, #AD2D14 0%, #F42E07 100%))"
              }}
            >
              Comprar Item
            </Button>
          </div>
        </div>
        <div className={styles.seller}>
          <Typography
            variant="h2"
            className={styles.itemTitle}
            style={{
              color: "#fff",
              fontFamily: "Inter",
              fontSize: "48px",
              fontWeight: 500,
              textAlign: "left",
              lineHeight: "100%",
            }}
          >
            Vendedor
          </Typography>
        </div>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={styles.timerIcon}
              >
                <path
                  d="M6 3V6H8.25M10.5 6C10.5 6.59095 10.3836 7.17611 10.1575 7.72208C9.93131 8.26804 9.59984 8.76412 9.18198 9.18198C8.76412 9.59984 8.26804 9.93131 7.72208 10.1575C7.17611 10.3836 6.59095 10.5 6 10.5C5.40905 10.5 4.82389 10.3836 4.27792 10.1575C3.73196 9.93131 3.23588 9.59984 2.81802 9.18198C2.40016 8.76412 2.06869 8.26804 1.84254 7.72208C1.6164 7.17611 1.5 6.59095 1.5 6C1.5 4.80653 1.97411 3.66193 2.81802 2.81802C3.66193 1.97411 4.80653 1.5 6 1.5C7.19347 1.5 8.33807 1.97411 9.18198 2.81802C10.0259 3.66193 10.5 4.80653 10.5 6Z"
                  stroke="#75767D"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p
                style={{
                  color: "var(--gray-gray-300, #75767D)",
                  fontWeight: 500,
                }}
              >
                12 minutos atrás
              </p>        
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarktItem;
