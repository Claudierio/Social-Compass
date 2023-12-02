import React from "react";
import styles from "./marktplace.module.scss";
import { Button, Typography, Grid } from "@mui/material";

const products = [
  {
    id: 1,
    title: "Produto 1",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    status: "Ainda não vendido",
    image: "/marketImage.png",
  },
  {
    id: 2,
    title: "Produto 2",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    status: "Ainda não vendido",
    image: "/marketImage.png",
  },
  {
    id: 3,
    title: "Produto 3",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    status: "Ainda não vendido",
    image: "/marketImage.png",
  },
  {
    id: 4,
    title: "Produto 1",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    status: "Ainda não vendido",
    image: "/marketImage.png",
  },
  {
    id: 5,
    title: "Produto 2",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    status: "Ainda não vendido",
    image: "/marketImage.png",
  },
  {
    id: 6,
    title: "Produto 3",
    description:
      "lLorem ipsum dolor sit amet, consectetur adipisicing elit. Officia reiciendis eligendi ullam sed, optio eum provident libero sapiente iure odit eos, officiis molestiae dignissimos mollitia expedita id natus magni aspernatur!",
    status: "Ainda não vendido",
    image: "/marketImage.png",
  },
];

const Marketplace = () => {
  return (
    <div className={styles.main}>
      <div className={styles.headerMarket} style={{margin: '16px'}}>
        <div className={styles.headerText}>
          <Typography
            style={{
              color: "var(--gray-gray-300, #75767D)",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "24px",
              letterSpacing: "1.12px",
              textTransform: "uppercase",
              margin: 0, // Remova a margem fixa
            }}
          >
            Todos os itens
          </Typography>
          <Typography
            variant="h3"
            style={{
              color: "var(--white, #F5F5F5)",
              textAlign: "center",
              fontFamily: "Inter",
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "56px",
              letterSpacing: "-0.96px",
              margin: 0, // Remova a margem fixa
            }}
          >
            Marketplace
          </Typography>
        </div>
        <div className={styles.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          className={`${styles.buttonRegister} ${styles.addButtonMargin}`}
        >
          Adicionar item
        </Button>
      </div>
      </div>

      <div className={styles.contentMarket} style={{ marginTop: "36px" }}>
        <Grid container spacing={0}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <div className={styles.marketItem} style={{ maxWidth: "255px" }}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "255px" }}
                  />
                </div>
                <Typography
                  style={{
                    color: "var(--white, #F5F5F5)",
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: 500,
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  style={{
                    marginTop: '5px',
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "24px",
                    letterSpacing: "-0.14px",
                    color: "var(--gray-gray-200, #A1A3A7)", // Added color style
                    marginBottom: "8px", // Added margin for spacing
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {product.description}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    letterSpacing: "-0.14px",
                    color: "var(--gray-gray-200, #A1A3A7)", // Added color style
                    marginBottom: "8px", // Added margin for spacing
                    textAlign: "left", // Align text to the left
                  }}
                >
                  R$ 300,00
                </Typography>

                <Typography
                  style={{
                    width: "150px",
                    borderRadius: "24px",
                    background: "var(--gray-gray-200, #A1A3A7)",
                    padding: "4px 12px",
                    gap: "10px",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    color: "var(--white, #F5F5F5)", // Set text color as needed
                    cursor: 'pointer'
                  }}
                >
                  {product.status}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Marketplace;
