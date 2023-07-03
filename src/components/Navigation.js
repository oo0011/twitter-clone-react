import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {userObj && (
            <Link to="/profile">
              {userObj.displayName ? userObj.displayName : "유저"} Profile
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
