import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "css/Profile.module.css";

const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();

    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  useEffect(() => {
    getMyNweets();
  });

  return (
    <>
      <div className={styles.Profile_Box}>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Display name"
            value={newDisplayName}
          />
          <input className={styles.button1} type="submit" value="수정" />
        </form>
        <button className={styles.button2} onClick={onLogOutClick}>
          로그아웃
        </button>
      </div>
    </>
  );
};

export default Profile;
