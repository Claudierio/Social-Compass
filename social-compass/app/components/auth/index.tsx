/* "use client";

import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useStore from "../../(general)/stateZustand";

const Auth = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useStore(); // Substitua pelo seu estado de autenticação

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login'); // Redirecione para a página de login se não estiver autenticado
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn && children}</>;
};

export default Auth;
 */