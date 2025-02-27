import { createContext, useReducer, useContext } from "react";

// Initial State
const initialState = {
  user: null,
  cart: [],
  orders: [],
  scheduledOrders: [],
};

// Reducer Function
const storeReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_TO_CART":
      //console.log(state.cart);
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        //console.log("existing item")
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      //console.log(action.payload);
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "ADD_ORDER":
      const newOrder = {
        id: Date.now(), // Unique order ID
        items: action.payload.items,
        total: action.payload.total, // Store total price
        date: new Date().toISOString(),
        status: "Pending",
      };
      return { ...state, orders: [...state.orders, newOrder], cart: [] };
    case "ADD_SCHEDULED_ORDER":
      return {
        ...state,
        scheduledOrders: [...state.scheduledOrders, action.payload],
      };

    case "LOGOUT":
      return { ...state, user: null, cart: [], orders: [] };
    default:
      return state;
  }
};

// Context
const StoreContext = createContext();

// Provider Component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom Hook
export const useStore = () => {
  return useContext(StoreContext);
};
