import React from "react";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen/DashboardScreen";
import Header from "./components/Header/Header";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Header />

      <main>
        <Route path="/" exact component={HomeScreen} />
        <Route
          path="/signin"
          exact
          component={() => (!user ? <LoginScreen /> : <Redirect to="/" />)}
        />
        <Route
          path="/signup"
          exact
          component={() => (!user ? <RegisterScreen /> : <Redirect to="/" />)}
        />
        <Route path="/dashboard" exact component={DashboardScreen} />
        <Route path="/dashboard/search" exact component={DashboardScreen} />
      </main>
    </Router>
  );
};

export default App;
