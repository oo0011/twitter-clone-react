import { authService } from "fbase";
import React, { useState } from "react";
import styles from "css/AuthForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onClick = () => {
    if (email === "") {
      alert("아이디를 입력 하세요.");
    } else if (password === "") {
      alert("비밀번호를 입력 하세요.");
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className={styles.Login_Input_Box}>
      <>
        <form onSubmit={onSubmit}>
          <div className={styles.column}>
            <div className={styles.title_box}>
              <h1 className={styles.title_box}>1030</h1>
            </div>

            <div className={styles.email_box}>
              <div className={styles.icon_box}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
              </div>
              <input
                className={styles.login_input}
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
              />
            </div>

            <div className={styles.email_box}>
              <div className={styles.icon_box}>
                <FontAwesomeIcon icon={faLock} className={styles.icon} />
              </div>
              <input
                className={styles.login_input}
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
              />
            </div>

            <br />
          </div>
          <div className={styles.Login_Input_Submit_Box}>
            <input
              onClick={onClick}
              className={styles.submit_button}
              type="submit"
              value="LOGIN"
            />
            {error}
          </div>
        </form>
      </>
    </div>
  );
};

export default AuthForm;
