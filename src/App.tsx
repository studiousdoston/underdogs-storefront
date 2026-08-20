import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clothes from "./pages/Clothes";
import Accessories from "./pages/Accessories";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import { AuthModalProvider } from "./context/AuthModalContext";
import { AuthModal } from "./components/Modals/AuthModal";

import "./App.css";
import Auth from "./pages/Auth";
import { SearchModalProvider } from "./context/SearchModalContext";
import { SearchModal } from "./components/Modals/SearchModal";

function App() {
  return (
    <AuthModalProvider>
      <SearchModalProvider>
        <BrowserRouter>
          <div className="layout">
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/clothes" element={<Clothes />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
          <AuthModal />
          <SearchModal />
        </BrowserRouter>
      </SearchModalProvider>
    </AuthModalProvider>
  );
}

export default App;
