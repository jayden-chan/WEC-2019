import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/header.min.css';

class Header extends Component {

  

  render() {
    return (
      <header>
        <div className="header-main">
          < nav className = "navbar navbar-expand-md navbar-dark bg-primary justify-content-between" >
            <a className="navbar-brand" href="/">
              Lion Inc. Basins
            </a>
        
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown 
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Small</a>
                <a class="dropdown-item" href="#">Medium</a>
                <a class="dropdown-item" href="#">Large</a>
              </div>
            </div>
          </nav>
        </div >
      </header>
     
    );
  }
}
export default Header;
