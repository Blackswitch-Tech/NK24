import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { RouterPaths } from "./components/router";
import useReady from "./components/useReady";
import { Loader } from "./components/Loader.js";

import { getAnalytics, logEvent } from "firebase/analytics";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop.js";
//const analytics = getAnalytics();
//logEvent(analytics, "received");

function App() {
  const { ready } = useReady(3500);

  document.documentElement.classList.add('dark')
  return (
    <div className="App ">
      {ready !== true ? (
        <Loader />
      ) : (
        <Router>
          <Navbar />
<ScrollToTop/>
          <RouterPaths />
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
