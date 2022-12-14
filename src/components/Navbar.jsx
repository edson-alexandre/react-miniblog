import styles from "./Navbar.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
  const { user, setUser } = useAuthValue();

  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const logUserOut = async () => {
    await logout();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/home" className={styles.brand}>
        Mini <span>Blog</span>{" "}
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>

        {user && (
          <li>
            <button onClick={logUserOut}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
