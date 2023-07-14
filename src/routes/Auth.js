import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import styles from "css/Auth.module.css";
import google from "../image/google_logo.png";
import github from "../image/github_logo.png";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className={styles.Auth_Box}>
      <AuthForm />
      <div className={styles.Auth_Button_Box}>
        <button onClick={onSocialClick} name="google">
          <img src={google} alt="google" />
          Google
        </button>

        <button onClick={onSocialClick} name="github">
          <img src={github} alt="github" />
          Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
