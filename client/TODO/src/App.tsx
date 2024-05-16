import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Settings from "./components/Settings";
import AuthRoutes from "./Utils/AuthRoutes";
import PrivateRoutes from "./Utils/PrivateRoutes";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
