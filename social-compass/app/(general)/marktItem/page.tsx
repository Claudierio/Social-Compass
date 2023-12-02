import React from "react";
import styles from "./marktItem.module.scss";
import { Button, Typography } from "@mui/material";

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

  return (
    <div className={styles.main}>
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
          >
            Comprar Item
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MarktItem;
