import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<>404 | Not Found go to homepage</>} />
      </Routes>
    </BrowserRouter>
  );
}
