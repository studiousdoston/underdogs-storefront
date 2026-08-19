import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clothes from "./pages/Clothes";
import Accessories from "./pages/Accessories";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
