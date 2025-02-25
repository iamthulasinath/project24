import { ChevronRight, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Sushi",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="hero-section">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"
            alt="Hero"
            className="hero-image"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Delicious Food Delivered</h1>
              <p className="hero-subtitle">
                Order your favorite meals from the best restaurants
              </p>
              <button
                className="order-button"
                onClick={() => navigate("/search")}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        <div className="categories-section">
          <div className="categories-header">
            <h2 className="categories-title">Popular Categories</h2>
            <button className="view-all-button">
              View All <ChevronRight className="chevron-icon" />
            </button>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <div className="category-overlay">
                  <h3 className="category-name">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
