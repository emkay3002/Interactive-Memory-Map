import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutPage from "./pages/About";
import CapsulePage from "./pages/capsulesPage";
import FriendPage from "./pages/Friends";
import HomePage from "./pages/homepage";
import Loginpage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import Grouppage from "./pages/grouppage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/capsules" element={<CapsulePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path ="/grouppage" element={<Grouppage />} />
      </Routes>
    </Router>
  );
}

export default App;
