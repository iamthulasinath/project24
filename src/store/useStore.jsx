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
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
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
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
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
      return { ...state, orders: [...state.orders, action.payload], cart: [] };
    case "ADD_SCHEDULED_ORDER":
      return {
        ...state,
        scheduledOrders: [...state.scheduledOrders, action.payload],
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        cart: [],
        orders: [],
        scheduledOrders: [],
      };
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
