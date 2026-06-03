import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
  <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#24292e",
    padding: "15px 30px",
    color: "white",

    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    zIndex: "1000",
    boxSizing: "border-box",
  }}
>
      <h2>SocialSphere 🚀</h2>

      <div>
        <Link
          to="/feed"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Profile
        </Link>

        <button
          onClick={logout}
          style={{
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;