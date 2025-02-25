import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search as SearchIcon,
  ShoppingCart,
  Plus,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../store/useStore";

import { Navbar } from "../components/Navbar";
import "./Search.css";

const foodItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic tomato sauce with fresh mozzarella and basil",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=600",
    category: "Pizza",
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Tomato sauce, mozzarella, and spicy pepperoni",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
    category: "Pizza",
  },
  {
    id: "3",
    name: "Chicken Burger",
    description:
      "Grilled chicken breast with lettuce, tomato, and special sauce",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
    category: "Burger",
  },
  {
    id: "4",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=600",
    category: "Burger",
  },
];

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const { cart, addToCart } = useStore();

  useEffect(() => {
    const filtered = foodItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const handleAddToCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      alert("This item is already in your cart!");
      return;
    }

    addToCart(item);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <div className="search-bar-container">
          <div className="search-bar-wrapper">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="food-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="food-card">
              <div className="food-image-container">
                <img src={item.image} alt={item.name} className="food-image" />
                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-button"
                >
                  <Plus />
                </button>
              </div>
              <div className="food-details">
                <h3 className="food-name">{item.name}</h3>
                <p className="food-description">{item.description}</p>
                <div className="food-footer">
                  <span className="food-price">${item.price}</span>
                  <span className="food-category">{item.category}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="no-results">
              <AlertCircle className="no-results-icon" />
              <h3 className="no-results-title">No items found</h3>
              <p className="no-results-text">
                Try searching for something else
              </p>
            </div>
          )}
        </div>

        <div
          className={`cart-notification ${showCartNotification ? "show" : ""}`}
        >
          <div className="cart-notification-content">
            <div className="cart-info">
              <ShoppingCart className="cart-icon" />
              <span className="cart-count">{cart.length} items in cart</span>
            </div>
            <Link to="/cart" className="view-cart-button">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
