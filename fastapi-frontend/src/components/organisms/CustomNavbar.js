import React from 'react';
import PropTypes from 'prop-types';
import { faBars, faBriefcase, faBell } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import logo from './logo.png'
import logosvg from "./F C.svg"

const CustomNavbar = ({ activeLink }) => {

  const isHome = activeLink === 'home';
  const isMake = activeLink === 'competition';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <button
          data-mdb-collapse-init
          className="navbar-toggler"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="/">

                 <Image
                  src={logosvg}
                  width={55}
                  height={55}
                  alt="Picture of the author"
                /> 
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${activeLink === 'home' ? 'active' : ''}`}>
              <a className={`nav-link ${activeLink === 'home' ? 'active' : ''}`} href="/">
                <b>Search competitions</b>
              </a>
            </li>
            <li className={`nav-item ${activeLink === 'competition' ? 'active' : ''}`}>
              <a className={`nav-link ${activeLink === 'competition' ? 'active' : ''}`} href="/makeCompetition">
                <b>Post competition</b>
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <a className="text-reset me-3" href="/setUser">
            <FontAwesomeIcon icon= {faBriefcase} className="fs-3"/>
          </a>

          <div className="dropdown">
            <a
              data-mdb-dropdown-init
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              aria-expanded="false"
            >
              <img
                src="https://media.licdn.com/dms/image/D5603AQG5GP-OJawHLw/profile-displayphoto-shrink_400_400/0/1688402582331?e=1707350400&v=beta&t=kCXKODeT34tsZJ52zY9nCrfwdfaqgKxawEa2NEr_vGw"
                className="rounded-circle"
                height="35"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

CustomNavbar.propTypes = {
  activeLink: PropTypes.string.isRequired,
};

export default CustomNavbar;


