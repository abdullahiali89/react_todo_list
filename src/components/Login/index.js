import styles from "./Login.module.css";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { auth } from "../../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import { ACTIONS } from "../App/mainStateReducer.js";

const URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://abdullahistodolist.herokuapp.com";

function Login({ dispatch, mainState }) {
  const passwordRef = useRef();
  const emailRef = useRef();
  const [toggleLogIn, setToggleLogIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserfromDB() {
      const response = await fetch(`${URL}/users/${mainState.userId}`);
      const data = await response.json();
      console.log(data);
      setToggleLogIn(false);
      dispatch({
        type: ACTIONS.UPDATE_NAME,
        payload: data.payload.user_name,
      });
      navigate(`/user/${auth.currentUser.uid}`);
    }
    if (toggleLogIn) {
      getUserfromDB();
    }
  }, [toggleLogIn]);

  // useEffect(() => {
  //   async function getTodos() {
  //     console.log(mainState.userId);
  //     const response = await fetch(`${URL}/tasks/${mainState.userId}`, {
  // 
  //     });
  //     setToggleLogIn(false);
  //     const data = await response.json();
  //     console.log(data);
  //     dispatch({ type: ACTIONS.UPDATE_USER_TODOS, payload: data.payload });
  //     navigate(`/user/${auth.currentUser.uid}`);
  //   }
  //   if (mainState.name) {
  //     getTodos();
  //   }
  // }, [mainState.name]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(true);

      if (auth.currentUser) {
       

        window.localStorage.setItem("userId", auth.currentUser.uid);
        dispatch({
          type: ACTIONS.UPDATE_USER_ID,
          payload: auth.currentUser.uid,
        });
        setToggleLogIn(true);
        // navigate(`/user/${auth.currentUser.uid}`);
      }
    } catch (error) {
      console.log(error);
      console.log(error);
      setError("fail to Login");
    }
    setLoading(false);
  }

  return (
    <div className={styles.login}>
      <header className={styles.formHeader}>
        <h1>Login</h1>
      </header>
      {error && alert(error)}
      <form
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          ref={emailRef}
          className={styles.usernameInput}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          className={styles.passwordInput}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button disabled={loading} className={styles.loginbtn}>
          Login
        </button>
      </form>
      <p>
        Dont't already have an account?{" "}
        <Link to={"/signup"}>
          <span> Sign up Here</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
