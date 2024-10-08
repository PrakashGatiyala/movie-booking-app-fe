import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
