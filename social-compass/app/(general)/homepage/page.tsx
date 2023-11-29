"use client";

// pages/homepage/page.tsx
import Link from 'next/link';
import styles from './Homepage.module.scss';
import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import useStore from '../../(general)/store';

const HomePage = () => {
  const { open, selectedItem, modalOpen, setOpen, setSelectedItem, setModalOpen } = useStore();

  return (
    <div style={{ marginLeft: modalOpen ? '240px' : '0' }}>
      <Navbar
        open={open}
        selectedItem={selectedItem}
        modalOpen={modalOpen}
        setOpen={setOpen}
        setSelectedItem={setSelectedItem}
        setModalOpen={setModalOpen}
      />
      
    </div>
  );
};

export default HomePage;
