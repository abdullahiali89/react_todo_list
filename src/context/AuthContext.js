import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signup(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
  }
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logOut() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscriber;
  }, []);

  const value = {
    currentUser,
    signup,
    logOut,
    login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
