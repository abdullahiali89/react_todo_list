import styles from "./SignUp.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { auth } from "../../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import { ACTIONS } from "../App/mainStateReducer.js";

const URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://abdullahistodolist.herokuapp.com";
function SighnUp({ dispatch, mainState }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmedRef = useRef();
  const [error, setError] = useState("");
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
      return setError("password do not match");
    }
    try {
      setError("");

      await signup(emailRef.current.value, passwordRef.current.value);

      setLoading(true);

      if (auth.currentUser) {
       

        setToggleSignUp(true);
        window.localStorage.setItem("userId", auth.currentUser.uid);

        dispatch({
          type: ACTIONS.UPDATE_USER_ID,
          payload: auth.currentUser.uid,
        });
      }
    } catch (error) {
      console.log(error);
      setError("fail to set up account");
    }
    setLoading(false);
  }
  //adds userid and name to db

  useEffect(() => {
    async function postUserToDB() {
  
      const response = await fetch(`${URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          userId: auth.currentUser.uid,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch({
        type: ACTIONS.UPDATE_NAME,
        payload: data.payload[0].user_name,
      });
      navigate(`/user/${auth.currentUser.uid}`);
    }
    if (toggleSignUp) {
      postUserToDB();
    }
  }, [toggleSignUp]);

  // useEffect(() => {
  //   async function getTodos() {
  //     const response = await fetch(`${URL}/tasks/${mainState.userId}`
  //     setToggleSignUp(false);
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   if (toggleSignUp) {
  //     getTodos();
  //   }
  // }, [mainState.name]);
  return (
    <div className={styles.SignUp}>
      <header className={styles.formHeader}>
        <h1>SignUp</h1>
      </header>
      {error && alert(error)}
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <input
          ref={nameRef}
          className={styles.nameInput}
          required
          placeholder="name"
          type="text"
          name="name"
        />
        <input
          ref={emailRef}
          className={styles.emailInput}
          required
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          ref={passwordRef}
          className={styles.passwordInput}
          required
          placeholder="Password"
          type="password"
          name="password"
        />
        <input
          ref={passwordConfirmedRef}
          className={styles.confirmPasswordInput}
          required
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <button disabled={loading} className={styles.signUpbtn}>
          signup
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to={"/login"}>
          <span>login Here</span>
        </Link>
      </p>
    </div>
  );
}

export default SighnUp;
