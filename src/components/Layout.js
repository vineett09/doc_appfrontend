import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token specifically
    localStorage.clear(); // Optionally clear all other items
    message.success("Logout successfully");
    navigate("/login");
  };

  const handleSearch = () => {
    console.log("Searching for specialization:", specialization);
    navigate(`/search?specialization=${specialization}`);
  };

  //===========Doctor menu============//
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  //===========Doctor menu============//

  // rendering menu
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Doc-app</h6>
            <hr />
          </div>
          <div className="menu">
            {sidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`menu-item ${isActive && "active"}`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <div className="right-section">
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                  style={{ cursor: "pointer", marginRight: "20px" }}
                >
                  <i className="fa-solid fa-message"></i>
                </Badge>
                <form
                  className="form-inline"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <div className="search-container">
                    <input
                      className="form-control search-bar"
                      type="search"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="Find by specialization"
                      aria-label="Search"
                    />
                    <button
                      className="btn btn-outline-success search-button"
                      type="submit"
                    >
                      Find
                    </button>
                  </div>
                </form>
                <Link to="/profile" className="ml-3">
                  {user?.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
