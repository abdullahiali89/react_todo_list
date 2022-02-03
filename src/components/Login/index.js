import styles from "./Login.module.css";
function Login({ submitHandler }) {
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e);
        }}
      >
        <input
          className={styles.usernameInput}
          name="username"
          type="text"
          placeholder="Username"
        />
        <input
          className={styles.passwordInput}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button className={styles.loginbtn}>Login</button>
      </form>
    </div>
  );
}

export default Login;
