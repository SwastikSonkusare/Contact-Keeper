import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header />

      <main>
        {/* <Route path="/" exact component={HomeScreen} /> */}
        <Route path="/signin" component={LoginScreen} />
        <Route path="/signup" component={RegisterScreen} />
      </main>
    </Router>
  );
};

export default App;
