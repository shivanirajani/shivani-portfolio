import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
    <ul className="navbar-list">
      <li className="navbar-item">
        <NavLink to="/" className="navbar-link" data-nav-link>
          Sobre Mi
        </NavLink>
      </li>

      <li className="navbar-item">
        <NavLink to="/resume" className="navbar-link" data-nav-link>
          Trayectoria
        </NavLink>
      </li>

      <li className="navbar-item">
        <NavLink to="/portfolio" className="navbar-link" data-nav-link>
          Portfolio
        </NavLink>
      </li>


      <li className="navbar-item">
        <NavLink to="/contact" className="navbar-link" data-nav-link>
          Contacto
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar