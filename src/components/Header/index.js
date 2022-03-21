import styles from "./Header.module.css";
import { ACTIONS } from "../App/mainStateReducer";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

function Header({ name, dispatch }) {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  async function handleLogOut() {
    await logOut();
    window.localStorage.removeItem("userId");
    navigate("/login");
    dispatch({
      type: ACTIONS.UPDATE_NAME,
      payload: "",
    });
    dispatch({ type: ACTIONS.UPDATE_USER_TODOS, payload: [] });
  }

  return (
    <nav className={styles.header}>
      {name ? (
        <h1 className={styles.title}>{name}'s ToDo List</h1>
      ) : (
        <h1 className={styles.title}>My React ToDo List</h1>
      )}
      {window.localStorage.getItem("userId") && (
        <button className={styles.logOut} onClick={handleLogOut}>
          logOut
        </button>
      )}
    </nav>
  );
}

export default Header;
