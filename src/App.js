import React, { useEffect } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "aos/dist/aos.css";
import './assets/index.css';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Compliance from "./pages/Compliance";
import {useDocTitle} from './components/CustomHook';
import "./App.css";
import './index.css';

function App() {

  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("IsenGuard AI");

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/contact">
            <Contact />
            </Route>
          <Route path="/compliance">
            <Compliance />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
