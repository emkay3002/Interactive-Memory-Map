import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AboutPage from "./pages/About";
import CapsulePage from "./pages/capsulesPage";
import FriendPage from "./pages/Friends";
import Grouppage from "./pages/grouppage";
import HomePage from "./pages/homepage";
import LoggedIn from "./pages/loggedinHome";
import Loginpage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/loggedIn" element={<LoggedIn />} />
        <Route path="/signin" element={<Loginpage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/capsules" element={<CapsulePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/grouppage" element={<Grouppage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
