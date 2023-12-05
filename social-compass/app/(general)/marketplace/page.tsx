"use client";

import React, { useState, useEffect } from "react";
import styles from "./marktplace.module.scss";
import { Button, Typography, Grid, Card } from "@mui/material";
import Navbar from "../../components/navbar";
import useStore from "../stateZustand";
import Link from "next/link";
import ModalMarket from "../../components/modalMarket";

const products = [
  {
    id: 1,
    title: "PlayStation 5",
    description:
      "Maravilhe-se com os gráficos incríveis e experimente os recursos do novo PS5. Compre agora e aproveite as ofertas para o novo PlayStation 5",
    status: "Ainda não vendido",
    image: "/marketImage.png",
    value: "R$ 3.999,00"
  },
  {
    id: 2,
    title: "Xbox Series X",
    description:
      "Descubra o Xbox mais rápido e potente de todos os tempos com o Xbox Series X. Aproveite os jogos em 4K em até 120 quadros por segundo nesse console",
    status: "Ainda não vendido",
    image: "/marketImage.png",
    value: "R$ 4.449,00"
  },
  {
    id: 3,
    title: "Monitor Gamer LG UltraGear",
    description:
      "Desenvolvido para o gamer, os recursos mais avançados e design eletrizante garantem uma experiência imersiva, taxa de atualização de 144Hz.",
    status: "Ainda não vendido",
    image: "/marketImage.png",
    value: "R$ 821,65"
  },
  {
    id: 4,
    title: "Notebook Acer Aspire 5",
    description:
      "Os notebooks da linha aspire 5 são convenientemente portáteis e elegantes para acompanhar suas tarefas do dia a dia. Os recursos tecnológicos de sua confiança ao seu lado sempre que precisar",
    status: "Ainda não vendido",
    image: "/marketImage.png",
    value: "R$ 3.578,69"
  },
  {
    id: 5,
    title: "Apple iPhone 13 256GB",
    description:
      "O iPhone 13 é uma combinação perfeita de beleza e desempenho, oferecendo inúmeras razões para você se apaixonar por ele. Se você busca um smartphone que atenda a todas as suas necessidades.",
    status: "Ainda não vendido",
    image: "/marketImage.png",
    value: "R$ 4.399,00"
  },
  {
    id: 6,
    title: "Headphone Havit",
    description:
      "Headset Gamer Havit H2002D Aparência e textura proporcionais, simples e generosas. Jaqueta de liga leve com frente e superfície de plástico com revestimento de piano. Design Gamer em preto.",
    status: "Ainda não vendido",
    image: "/marketImage.png",
    value: ""
  },
];

const Marketplace = () => {
  const {
    open,
    selectedItem,
    modalOpen,
    setOpen,
    setSelectedItem,
    setModalOpen,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const homePostStyle = {
    width: modalOpen ? "calc(100% - 350px)" : "100%",
    marginLeft: modalOpen ? "350px" : "0",
  };

  const mobileHomePostStyle = {
    width: "100%",
    marginLeft: "-4%",
  };

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

  return (
    <Card
      style={{
        background: "#17181c",
        marginTop: "-40px",
        paddingTop: "30px",
      }}
    >
      <Navbar
        open={open}
        selectedItem={selectedItem}
        modalOpen={modalOpen}
        setOpen={setOpen}
        setSelectedItem={setSelectedItem}
        setModalOpen={setModalOpen}
      />

      <div className={styles.main} style={isMobile ? mobileHomePostStyle : homePostStyle}>
        <div className={styles.headerMarket} style={{ margin: "16px" }}>
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
                margin: 0,
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
              }}
            >
              Marketplace
            </Typography>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              className={`${styles.buttonRegister} ${styles.addButtonMargin}`}
            >
              Adicionar item
            </Button>
            <ModalMarket
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
          </div>
        </div>

        <div className={styles.contentMarket} style={{ marginTop: "36px"}}>
          <Grid container spacing={0}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <div
                  className={styles.marketItem}
                  style={{ maxWidth: "255px" }}
                >
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
                      textAlign: "left",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "5px",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "24px",
                      letterSpacing: "-0.14px",
                      color: "var(--gray-gray-200, #A1A3A7)",
                      marginBottom: "8px",
                      textAlign: "left",
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
                      color: "var(--gray-gray-200, #A1A3A7)",
                      marginBottom: "8px",
                      textAlign: "left",
                    }}
                  >
                    {product.value}
                  </Typography>

                  <Link
                    style={{
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
                      textDecoration: "none",
                      marginRight: "40%",
                    }}
                    href="/marketItem"
                  >
                    {product.status}
                  </Link>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Card>
  );
};

export default Marketplace;
