import React from "react";

import "./HomeScreen.scss";

const HomeScreen = () => {
  return (
    <div className="home">
      <h1 className="home__heading">
        <span>Contact Keeper</span>
      </h1>
      <p className="home__paragraph">An app to keep track of your contacts</p>
    </div>
  );
};

export default HomeScreen;
