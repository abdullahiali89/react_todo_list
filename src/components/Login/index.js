function Login({ submitHandler }) {
  return (
    <div className="Login">
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e);
        }}
      >
        <label htmlFor="username"> enter username:</label>
        <input name="username" type="text" />
        <label htmlFor="password">Enter Password:</label>
        <input name="password" type="password" />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
