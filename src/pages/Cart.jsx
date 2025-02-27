import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Trash2, ArrowLeft } from "lucide-react";
import { useStore } from "../store/useStore";
import DatePicker from "react-datepicker"; // Import date picker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import "./Cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const [scheduleDate, setScheduleDate] = useState(null); // State to store scheduled time

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (state.cart.length === 0) {
      alert("Your cart is empty! Add some items before checking out.");
      return;
    }

    const orderData = {
      id: Date.now(), // Unique order ID
      items: state.cart,
      total,
      scheduledFor: scheduleDate ? scheduleDate.toISOString() : null, // Store date in ISO format
      date: new Date().toISOString(),
      status: "Pending",
    };

    if (scheduleDate) {
      dispatch({ type: "ADD_SCHEDULED_ORDER", payload: orderData });
      alert("Your order has been scheduled!");
    } else {
      dispatch({ type: "ADD_ORDER", payload: orderData });
      alert("Order placed successfully!");
    }

    dispatch({ type: "CLEAR_CART" });
    navigate("/orders");
  };

  if (state.cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some delicious items to your cart</p>
          <button className="back-button" onClick={() => navigate("/search")}>
            <ArrowLeft />
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-items">
          {state.cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        },
                      })
                    }
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                  }
                  className="remove-button"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="schedule-order">
            <label>Schedule Order (optional):</label>
            <DatePicker
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select date & time"
            />
          </div>
          <button onClick={handleCheckout} className="checkout-button">
            {scheduleDate ? "Schedule Order" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </>
  );
};
