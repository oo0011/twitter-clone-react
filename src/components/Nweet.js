import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styles from "css/NweetFactory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj?.text || "");

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div className={styles.ee}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newNweet}
              type="text"
              placeholder="수정하실 내용을 입력하세요."
              required
              onChange={onChange}
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <div className={styles.Nweet_Boxs}>
            <div className={styles.nweet_user_box}>
              <div className={styles.icon_box}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} />
              </div>
              <span>{nweetObj.name}</span>
              {isOwner && (
                <>
                  <button onClick={toggleEditing} className={styles.button1}>
                    <FontAwesomeIcon icon={faPen} className={styles.icon2} />
                  </button>
                  <button onClick={onDeleteClick} className={styles.button2}>
                    <FontAwesomeIcon icon={faTrash} className={styles.icon2} />
                  </button>
                </>
              )}
            </div>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
              <img
                src={nweetObj.attachmentUrl}
                alt="img"
                width="300px"
                height="300px"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Nweet;
