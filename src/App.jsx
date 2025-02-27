// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Cart } from "./pages/Cart";
import { Orders } from "./pages/Orders";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { StoreProvider } from "./store/useStore";
import "./App.css";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
