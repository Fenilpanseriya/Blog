import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/auhtSlice";
import First from "./compponents/First";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./compponents/Login";
import Signup from "./compponents/Signup";
import AddPost from "./pages/AddPost";
import Onepost from "./compponents/Onepost";
function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);
  const [loading, setLoding] = useState(false);
  useEffect(() => {
    const status = data.status;
    console.log("status is " + status);
    if (status) {
      dispatch(login(data.userData));
    } else {
      dispatch(logout());
    }
    setLoding(false);
  }, [data.status]);
  return !loading ? (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/posts/:slug" element={<Onepost/>}/>
        <Route path="/" element={<First/>}/>
      </Routes>
     
      
    </Router>
  ) : null;
}

export default App;
