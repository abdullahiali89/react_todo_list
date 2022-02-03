import styles from "./SignUp.module.css";

function SighnUp({ submitHandler }) {
  return (
    <div className={styles.SignUp}>
      <header className={styles.formHeader}>
        <h1>SignUp</h1>
      </header>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e);
        }}
      >
        <input
          className={styles.usernameInput}
          required
          placeholder="Username"
          type="text"
          name="username"
        />
        <input
          className={styles.passwordInput}
          required
          placeholder="Password"
          type="password"
          name="password"
        />
        <input
          className={styles.confirmPasswordInput}
          required
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <button className={styles.signUpbtn}>signup</button>
      </form>
    </div>
  );
}

export default SighnUp;
