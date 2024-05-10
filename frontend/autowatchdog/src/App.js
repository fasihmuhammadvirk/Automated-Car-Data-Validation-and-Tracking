import Home from "./components/Home.js";
import "./App.css";
import Footer from "./components/Footer.js";
import SignIn from "./components/SignIn.js";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signinuser" element={<SignIn name = "User" />} />
      <Route exact path="/signinauthor" element={<SignIn name = "Author" />} />
      </Routes>

      <Footer/>
    </>
  );
}
export default App;
