import React from "react";
import { Link } from "react-router-dom";
import styles from "css/Nav.module.css";

const Navigation = ({ userObj }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>|</li>
        <li>
          {userObj && (
            <Link to="/profile">
              {userObj.displayName ? userObj.displayName : "유저"}님 프로필
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
