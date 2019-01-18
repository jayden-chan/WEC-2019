import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/header.min.css';

class Header extends Component {

  render() {
    return (
      <header>
        <div className="header-main">
          <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
              Lion Inc. Basins
            </a>
          </nav>
        </div>
      </header>
    );
  }
}
export default Header;
