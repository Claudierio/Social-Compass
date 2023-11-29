"use client";

import Link from "next/link";
import styles from "./Homepage.module.scss";
import React, { useState } from "react";
import Navbar from "../../components/navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      
      <h1>Homepage</h1>
      <p>Teste</p>
    </div>
  );
};

export default HomePage;
