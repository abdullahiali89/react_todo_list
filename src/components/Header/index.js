import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <h1>My React ToDo List</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>signup</button>
      </Link>
    </header>
  );
}

export default Header;
