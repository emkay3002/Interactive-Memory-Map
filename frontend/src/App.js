import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Loginpage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
