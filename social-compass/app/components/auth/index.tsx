/* "use client";

import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useStore from "../../(general)/stateZustand";

const Auth = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useStore(); 

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login'); 
    }
  }, [isLoggedIn]);

  return <>{isLoggedIn && children}</>;
};

export default Auth;
 */