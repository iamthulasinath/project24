import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Plus, AlertCircle } from "lucide-react";
import { Navbar } from "../components/Navbar";
import "./Search.css";
import { useStore } from "../store/useStore";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsData, setItemsData] = useState([]);

  const { state, dispatch } = useStore();

  // Fetch items from API
  useEffect(() => {
    fetch("http://localhost:3001/getitems")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        return response.json();
      })
      .then((data) => {
        //console.log("Items fetched:", data);
        setItemsData(data);
      })
      .catch((err) => {
        console.error("Error fetching data from backend:", err);
      });
  }, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // Filter items based on search query
  const filteredItems = itemsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.name} className="food-card">
                <div className="food-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="food-image"
                  />
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(item)}
                  >
                    <Plus />
                  </button>
                </div>
                <div className="food-details">
                  <h3 className="food-name">{item.name}</h3>
                  <div className="food-footer">
                    <span className="food-price">${item.price}</span>
                    <span className="food-category">{item.category}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <AlertCircle className="no-results-icon" />
              <h3 className="no-results-title">No items found</h3>
              <p className="no-results-text">
                Try searching for something else
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
