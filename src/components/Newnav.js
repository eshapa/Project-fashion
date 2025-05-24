import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaReact, FaWhatsapp } from "react-icons/fa";
import $ from "jquery";
import "./Newnav.css";

const Newnav = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;

    if (path !== "/" && path !== "/home") {
      setTimeout(() => {
        test();
        applyActiveClass();
      }, 100);
    }

    const handleResize = () => {
      if (path !== "/" && path !== "/home") {
        setTimeout(() => test(), 500);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const test = () => {
    const tabs = $("#navbarSupportedContent");
    const activeItem = tabs.find(".active");
    const height = activeItem.innerHeight();
    const width = activeItem.innerWidth();
    const posTop = activeItem.position()?.top || 0;
    const posLeft = activeItem.position()?.left || 0;

    $(".hori-selector").css({
      top: `${posTop}px`,
      left: `${posLeft}px`,
      height: `${height}px`,
      width: `${width}px`,
    });

    $("#navbarSupportedContent").on("click", "li", function () {
      $("#navbarSupportedContent ul li").removeClass("active");
      $(this).addClass("active");

      const height = $(this).innerHeight();
      const width = $(this).innerWidth();
      const posTop = $(this).position()?.top || 0;
      const posLeft = $(this).position()?.left || 0;

      $(".hori-selector").css({
        top: `${posTop}px`,
        left: `${posLeft}px`,
        height: `${height}px`,
        width: `${width}px`,
      });
    });
  };

  const applyActiveClass = () => {
    const path = window.location.pathname.split("/").pop() || "home";
    const target = $(`#navbarSupportedContent ul li a[href='/${path}']`);
    target.parent().addClass("active");
  };

  const handleRollClick = () => {
    navigate("/roll");
  };

  return (
    <div className="full-width-navbar-wrapper">
      <nav className="navbar navbar-expand-lg navbar-mainbg">
        {/* Brand on left */}
        <NavLink className="navbar-brand navbar-logo" to="/">
          Divy<span>Luck</span>
        </NavLink>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          onClick={() => $(".navbar-collapse").slideToggle(300)}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Main nav content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <div className="hori-selector"></div>

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/herosection">
                Shringar Shilpi
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/vastrakosh">
                Vastrakosh
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/resources">
                Resources
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Search bar and social icons on right */}
          <div className="navbar-right-content d-flex align-items-center">
            <div className="search-bar mr-3">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search" />
            </div>

            <div className="social-icons">
              <button className="icon-button" aria-label="React Icon">
                <FaReact />
              </button>
              <button className="icon-button" aria-label="WhatsApp">
                <FaWhatsapp />
              </button>
            </div>

            {/* New Roll navigation hamburger button */}
            <button
              onClick={handleRollClick}
              aria-label="Roll Page"
              className="roll-hamburger-button"
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Newnav;

