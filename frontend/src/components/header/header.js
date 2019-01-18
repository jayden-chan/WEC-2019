import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/header.min.css';

class Header extends Component {

  renderLinks() {
    let url = window.location.href
    if (url.endsWith("dashboard") || url.endsWith("queue")) {
      return ([
        <ul key="dashLinks" className="navbar-nav ml-auto">
          <li key="logoutLink" className="nav-item">
            <Link to="logout" className="nav-link">
              Log Out
            </Link>
          </li>
          <li key="contactLink" className="nav-item">
            <Link to="contact" className="nav-link">
              About/Contact
            </Link>
          </li>
        </ul>
      ]);
    } else {
      return ([
        <ul key="normalLinks" className="navbar-nav ml-auto">
          <li key="loginLink" className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li key="orText" className="nav-item">
            <span className="navbar-text">or</span>
          </li>
          <li key="registerLink" className="nav-item">
            <Link to="/" className="nav-link">
              Register
            </Link>
          </li>
          <li key="contactLink" className="nav-item">
            <Link to="contact" className="nav-link">
              About/Contact
            </Link>
          </li>
        </ul>
      ]);
    }
  }

  render() {
    let links = this.renderLinks();
    return (
      <header>
        <div className="header-main">
          <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
              Lion Inc. Basins
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              {links}
            </div>
          </nav>
        </div>
      </header>
     
    );
  }
}
export default Header;
