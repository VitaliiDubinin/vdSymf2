import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="homeMain">
        {/* <div> */}

        {/* </div> */}
        <div className="homeNav">
          <Link to="/">
            <div className="noto-emoji emonav">π π ?</div>
          </Link>
          <Link to="/about">
            <div className="noto-emoji emonav">π§π»ββοΈπ«πΏπ«π§π»</div>
          </Link>
          <Link to="/addrecipe">
            {/* <Link to="/api/recipes/add"> */}
            <div className="noto-emoji emonav spanImage">+ </div>
          </Link>
          <Link to="/recipes">
            <div className="noto-emoji emonav">π©βπ³π¨βπ³ </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
