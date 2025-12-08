import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Canvas from "./Pages/Canvas";
import Rate from "./Pages/Rate";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Rate" element={<Rate />} />
      <Route path="/Canvas" element={<Canvas />} />
      <Route path="*" element={<Home />} />
    </Routes>

  );
}
