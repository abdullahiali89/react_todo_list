function SighnUp({ submitHandler }) {
  return (
    <div>
      <h1>SignUp</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(e);
        }}
      >
        <label htmlFor="username"> enter username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">enter Password:</label>
        <input type="password" name="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" />
        <button>signup</button>
      </form>
    </div>
  );
}

export default SighnUp;
