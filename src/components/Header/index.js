import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";

function Header() {
  const [page, setPage] = useState("home");
  function onLoginClick() {
    setPage("login");
    // localStorage.setItem("page", "login");
  }
  function onSignUpClick() {
    setPage("signUp");
    // localStorage.setItem("page", "SighnUp");
  }
  return (
    <header className={page === "home" ? styles.homeHeader : styles.header}>
      <h1 className={styles.title}>My React ToDo List</h1>
      <div>
        {}
        <Link to="/login">
          <button
            onClick={onLoginClick}
            className={page === "login" ? styles.hideLoginBtn : styles.loginBtn}
          >
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button
            onClick={onSignUpClick}
            className={
              page === "signUp" ? styles.hideSignUpBtn : styles.signUpBtn
            }
          >
            signup
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
