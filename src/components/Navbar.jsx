import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Clock,
  Menu,
  X,
  PinIcon,
} from "lucide-react";
import { useStore } from "../store/useStore";
import "./Navbar.css";

export const Navbar = () => {
  const { state } = useStore();
  const cartItemCount = state.cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/home" className="brand-link">
            <div className="navbar-brand">
              <span className="brand-text">mechloDine</span>
              <div className="user-location">
                <PinIcon className="pin-icon" />
                <p className="user-loaction-address">
                  Idupulapaya, IIT Campus, Kadapa, AndhraPradesh - 516330
                </p>
              </div>
            </div>
          </Link>

          <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
            <div className="nav-links">
              <Link to="/search" className="nav-link">
                <Search className="nav-icon" />
                <span>Search</span>
              </Link>

              <Link to="/cart" className="nav-link cart-link">
                <ShoppingCart className="nav-icon" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </Link>
              <Link to="/orders" className="nav-link">
                <Clock className="nav-icon" />
                <span>Orders</span>
              </Link>
              <Link
                to={state.user ? "/profile" : "/login"}
                className="nav-link"
              >
                <User className="nav-icon" />
                <span>{state.user ? "Profile" : "Login"}</span>
              </Link>
            </div>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
