import { Routes, Route } from "react-router-dom";
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
import { AuthProvider } from "../../context/AuthContext";
import Home from "../home";

function App() {
  const URL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://abdullahistodolist.herokuapp.com";
  const [mainState, dispatch] = useReducer(mainStateReducer, initialMainState);

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
      let todos = data.payload.sort((a, b) => {
        return a.id - b.id;
      });
      dispatch({ type: ACTIONS.UPDATE_USER_TODOS, payload: todos });
      dispatch({ type: ACTIONS.TOGGLE_NEW_TODO_ADDED });
      dispatch({ type: ACTIONS.NEW_USER_TODO, payload: "" });
    }
    if (mainState.newToDoAdded) {
      postNewToDo();
    }
  }, [mainState.newToDoAdded]);

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

  useEffect(() => {
    async function patchToDo() {
      const num = mainState.usersToDos.find((toDo) => {
        console.log(toDo, toDo.id, Number(mainState.updatedToDoId));
        return toDo.id === Number(mainState.updatedToDoId);
      });
      console.log(num);
      let status = "0";
      if (num.complete === "0") {
        status = "1";
      }
      console.log(status, num);
      const response = await fetch(`${URL}/tasks/${mainState.updatedToDoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, userId: mainState.userId }),
      });
      const data = await response.json();
      console.log(data);
      let todos = data.payload.sort((a, b) => {
        return a.id - b.id;
      });
      console.table(todos);
      dispatch({ type: ACTIONS.UPDATE_USER_TODOS, payload: data.payload });

      dispatch({ type: ACTIONS.UPDATED_TODO, payload: "" });
    }
    if (mainState.updatedToDoId) {
      patchToDo();
    }
  }, [mainState.updatedToDoId]);

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
  function handleCheck(e, index) {
    if (e.target.checked) {
      dispatch({ type: ACTIONS.UPDATED_TODO, payload: e.target.id });
      // dispatch({ type: ACTIONS.UPDATE_TODO_CHECKED, payload: index });
    } else {
      // dispatch({ type: ACTIONS.UPDATE_TODO_CHECKED, payload: index });
    }
  }
  return (
    <AuthProvider>
      <div className={styles.App}>
        <Header name={mainState.name} dispatch={dispatch} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/signup"
            element={
              <SignUp
                dispatch={dispatch}
                mainState={mainState}
                userId={mainState.userId}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                dispatch={dispatch}
                mainState={mainState}
                userId={mainState.userId}
              />
            }
          />
          <Route
            path={`/user/${mainState.userId}`}
            element={
              <ToDoDisplay
                dispatch={dispatch}
                mainState={mainState}
                handleDelete={handleDeleteToDo}
                submitHandler={handleAddToDo}
                handleOnChange={handleOnChange}
                handleCheck={handleCheck}
              />
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
