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
      <div className={styles.title_box}>
        <h1 className={styles.Title}>1030</h1>
      </div>
      <div className={styles.Profile_Box}>
        <div className={styles.form_box}>
          <h2 className={styles.profile_head}>프로필 수정</h2>
          <form onSubmit={onSubmit}>
            <input
              className={styles.profile_input}
              onChange={onChange}
              type="text"
              placeholder="Display name"
              value={newDisplayName}
            />
            <input className={styles.profile_btn} type="submit" value="수정" />
          </form>
          <button className={styles.profile_cancel} onClick={onLogOutClick}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
