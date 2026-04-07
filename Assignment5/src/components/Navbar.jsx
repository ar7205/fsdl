import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">⚡</div>
        <span className="brand-name">ReactLab</span>
        <span className="brand-tagline">v2.0 · Dashboard</span>
      </div>

      <span className="nav-label">Navigation</span>

      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="nav-icon">🔢</span>
            Calculator
          </NavLink>
        </li>
        <li>
          <NavLink to="/form" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="nav-icon">📋</span>
            User Form
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="nav-icon">📄</span>
            Resume Builder
          </NavLink>
        </li>
      </ul>

      <div className="navbar-footer">
        <div className="status-pill">
          <div className="status-dot" />
          System Active
        </div>
      </div>
    </nav>
  )
}
