import React from "react";
import { useStore } from "../store/useStore";
import { Navbar } from "../components/Navbar";
import "./Orders.css";

const mockOrders = [
  {
    id: "1",
    date: "2024-03-20",
    status: "completed",
    items: [
      {
        id: "1",
        name: "Margherita Pizza",
        quantity: 2,
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=600",
      },
    ],
    total: 25.98,
  },
  {
    id: "2",
    date: "2024-03-19",
    status: "completed",
    items: [
      {
        id: "3",
        name: "Chicken Burger",
        quantity: 1,
        price: 10.99,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
      },
    ],
    total: 10.99,
  },
];

export const Orders = () => {
  const { user } = useStore();

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <h1>Order History</h1>

        <div className="orders-list">
          {mockOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className={`order-status ${order.status}`}>
                    {order.status}
                  </span>
                </div>
                <span className="order-total">₹{order.total.toFixed(2)}</span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />
                    <div className="order-item-details">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p>₹{item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
