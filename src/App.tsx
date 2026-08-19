import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Home from "./pages/Home";
import Clothes from "./pages/Clothes";
import Accessories from "./pages/Accessories";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
