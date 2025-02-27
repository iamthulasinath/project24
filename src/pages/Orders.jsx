import React from "react";
import { useStore } from "../store/useStore";
import { Navbar } from "../components/Navbar";
import "./Orders.css";

export const Orders = () => {
  const { state } = useStore();

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <h1>Order History</h1>

        <div className="orders-list">
          {state.orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            state.orders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-date">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <span
                      className={`order-status ${order.status || "pending"}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <span className="order-total">₹{order.total}</span>
                </div>

                <div className="order-items">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="order-item-image"
                          />
                        )}
                        <div className="order-item-details">
                          <h3>{item.name}</h3>
                          <p>Quantity: {item.quantity}</p>
                          <p>₹{item.price} each</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in this order.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <h1>Scheduled Orders</h1>

        <div className="orders-list">
          {state.scheduledOrders.length === 0 ? (
            <p>No scheduled orders available.</p>
          ) : (
            state.scheduledOrders.map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-date">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <span
                      className={`order-status ${order.status || "pending"}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <span className="order-total">₹{order.total}</span>
                </div>

                {/* ✅ Display Scheduled Time */}
                <div className="scheduled-time">
                  <strong>Scheduled for:</strong>{" "}
                  {order.scheduledFor
                    ? new Date(order.scheduledFor).toLocaleString()
                    : "Not Scheduled"}
                </div>

                <div className="order-items">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="order-item-image"
                          />
                        )}
                        <div className="order-item-details">
                          <h3>{item.name}</h3>
                          <p>Quantity: {item.quantity}</p>
                          <p>₹{item.price} each</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items in this scheduled order.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
