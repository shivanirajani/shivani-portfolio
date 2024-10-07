import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
    <ul className="navbar-list">
      <li className="navbar-item">
        <Link to="/" className="navbar-link" data-nav-link>
          About Me
        </Link>
      </li>

      <li className="navbar-item">
        <Link to="/resume" className="navbar-link" data-nav-link>
          Career Path
        </Link>
      </li>

      <li className="navbar-item">
        <Link to="/portfolio" className="navbar-link" data-nav-link>
          Portfolio
        </Link>
      </li>


      <li className="navbar-item">
        <Link to="/contact" className="navbar-link" data-nav-link>
          Contact
        </Link>
      </li>
    </ul>
  </nav>
  )
}

export default Navbar