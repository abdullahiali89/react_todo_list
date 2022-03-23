import { auth } from "../../firebase.js";
import styles from "./ToDoDisplay.module.css";
import AddToDo from "../AddToDo";
import ToDo from "../ToDo";
import { useEffect, useState } from "react";
import { ACTIONS } from "../App/mainStateReducer.js";

const URL =
  process.env.REACT_APP_BACKEND_URL ||
  "https://abdullahistodolist.herokuapp.com";

function ToDoDisplay({
  dispatch,
  handleOnChange,
  handleDelete,
  mainState,
  submitHandler,
  handleCheck,
}) {
  console.table(mainState.usersToDos);

  useEffect(() => {
    async function getTodos() {
      const response = await fetch(`${URL}/tasks/${mainState.userId}`);
      const data = await response.json();
      let todos = data.payload.sort((a, b) => {
        return a.id - b.id;
      });
      dispatch({ type: ACTIONS.UPDATE_USER_TODOS, payload: todos });
    }

    getTodos();
  }, [mainState.nane]);
  return (
    <main className={styles.container}>
      {(auth?.currentUser?.uid || window.localStorage.getItem("userId")) && (
        <div>
          <AddToDo
            submitHandler={submitHandler}
            mainState={mainState}
            handleOnChange={handleOnChange}
          />
          <div className={styles.ToDos}>
            {mainState.usersToDos.map((toDo, index) => {
              return (
                <ToDo
                  checked={toDo.complete === "0" ? false : true}
                  toDo={toDo}
                  index={index}
                  key={toDo.id}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                />
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}

export default ToDoDisplay;
