import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer, useEffect } from "react";
import styles from "./App.module.css";
import Header from "../Header";
import Login from "../Login";
import SignUp from "../SignUp";
import ToDoDisplay from "../ToDoDisplay";
import {
  ACTIONS,
  mainStateReducer,
  initialMainState,
} from "./mainStateReducer.js";

function App() {
  const URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://abdullahistodolist.herokuapp.com";
  const navigate = useNavigate();
  const [mainState, dispatch] = useReducer(mainStateReducer, initialMainState);

  async function checkUserNameAvailable({ username }) {
    const Response = await fetch(`${URL}/users/${username}`, {
      method: "GET",
    });
    const data = await Response.json();

    if (data.payload !== undefined) {
      alert("Username is taken! Try another");
      return;
    }
    dispatch({ type: ACTIONS.TOGGLE_DETAILS_AVAILABLE });
    return;
  }
  //useEffect to see if username is available
  useEffect(() => {
    if (mainState.userSignUpDetails.username === undefined) {
      return;
    }
    if (
      mainState.userSignUpDetails.password !==
      mainState.userSignUpDetails.confirmedPassword
    ) {
      alert("passwords do not match!");
      return;
    }
    checkUserNameAvailable(mainState.userSignUpDetails);
  }, [mainState.userSignUpDetails]);

  async function postSignUpDetails(userSignUpDetails) {
    console.log(userSignUpDetails.username, userSignUpDetails.password);
    const Response = await fetch(`${URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userSignUpDetails.username,
        password: userSignUpDetails.password,
      }),
    });
    const data = await Response.json();
    console.log(data);
    const user_id = data.payload[0].user_id;
    dispatch({ type: ACTIONS.UPDATE_USER_ID, payload: { user_id } });
    dispatch({ type: ACTIONS.TOGGLE_DETAILS_AVAILABLE });
    dispatch({ type: ACTIONS.TOGGLE_USER_ID_UPDATED });
    return;
  }

  useEffect(() => {
    if (mainState.userIdUpdated) {
      navigate(`/user/${mainState.userId}`);
    }
  }, [mainState.userIdUpdated, mainState.userId, navigate]);

  //UseEffect to post signupdetails to DB
  useEffect(() => {
    if (mainState.signUpDetailsAvailable) {
      postSignUpDetails(mainState.userSignUpDetails);
    }
  }, [mainState.signUpDetailsAvailable, mainState.userSignUpDetails]);

  async function getUsersToDos(userId) {
    const Response = await fetch(`${URL}/tasks/${userId}`, {
      method: "GET",
    });
    const data = await Response.json();
    console.log(data.payload);
    dispatch({ type: ACTIONS.GET_USER_TODOS, payload: data.payload });
    dispatch({ type: ACTIONS.TOGGLE_LOGIN });
  }
  //UseEffect to get userDetails on login
  useEffect(() => {
    async function checkUserNameIsInDB(username) {
      const Response = await fetch(`${URL}/users/${username}`, {
        method: "GET",
      });

      const data = await Response.json();

      if (data.payload === undefined) {
        alert("Username NOT found! Try Again!");
        return;
      }
      dispatch({ type: ACTIONS.ADD_USER_ID, payload: data.payload[0].user_id });
      dispatch({ type: ACTIONS.TOGGLE_USER_ID_UPDATED });
      getUsersToDos(data.payload[0].user_id);
      console.log(mainState.userId);
      navigate(`/user/${mainState.userId}`);

      return;
    }
    if (mainState.login) {
      console.log(mainState.userLoginDetails);
      checkUserNameIsInDB(mainState.userLoginDetails.username);
    }
  }, [mainState.userLoginDetails, mainState.login, mainState.userId, navigate]);

  useEffect(() => {
    async function postNewToDo() {
      const Response = await fetch(`${URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: mainState.userId,
          taskText: mainState.newToDo,
          completion: 0,
        }),
      });
      const data = await Response.json();
      console.log(data.payload);
      dispatch({ type: ACTIONS.UPDATE_USER_TODOS, payload: data.payload });
      dispatch({ type: ACTIONS.TOGGLE_NEW_TODO_ADDED });
      dispatch({ type: ACTIONS.NEW_USER_TODO, payload: "" });
    }
    if (mainState.newToDoAdded) {
      postNewToDo();
    }
  }, [mainState.newToDoAdded, mainState.newToDo, mainState.userId]);

  useEffect(() => {
    async function deleteToDoFromDB() {
      const Response = await fetch(`${URL}/tasks/${mainState.deletedToDoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await Response.json();
      console.log(data);
      dispatch({ type: ACTIONS.DELETE_TODO, payload: data.payload[0].id });
      dispatch({ type: ACTIONS.TOGGLE_TODO_DELETED });
    }
    if (mainState.toDoDeleted) {
      deleteToDoFromDB();
    }
  }, [mainState.toDoDeleted, mainState.deletedToDoId]);

  function handleSignUp(e) {
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      confirmedPassword: e.target.confirmPassword.value,
    };
    dispatch({
      type: ACTIONS.SIGNUP_USER,
      payload: data,
    });
  }
  function handleLogin(e) {
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    dispatch({ type: ACTIONS.USER_LOGIN, payload: data });
    dispatch({ type: ACTIONS.TOGGLE_LOGIN });
  }
  function handleAddToDo(e) {
    dispatch({ type: ACTIONS.TOGGLE_NEW_TODO_ADDED });
  }
  function handleOnChange(e) {
    const toDo = e.target.value;
    dispatch({ type: ACTIONS.NEW_USER_TODO, payload: toDo });
    console.log(mainState.usersToDos);
  }
  function handleDeleteToDo(e) {
    const taskId = e.target.id;
    console.log("delete pressed");
    dispatch({ type: ACTIONS.SET_DELETED_TODO_ID, payload: taskId });
    dispatch({ type: ACTIONS.TOGGLE_TODO_DELETED });
  }

  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route
          path="/signup"
          element={<SignUp submitHandler={handleSignUp} />}
        />
        <Route path="/login" element={<Login submitHandler={handleLogin} />} />
        <Route
          path={`/user/${mainState.userId}`}
          element={
            <ToDoDisplay
              mainState={mainState}
              handleDelete={handleDeleteToDo}
              submitHandler={handleAddToDo}
              handleOnChange={handleOnChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
