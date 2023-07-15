import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import styles from "css/NweetFactory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj?.text || "");
  const [modalOpen, setModalOpen] = useState(false);
  const MAX_TEXT_LENGTH = 10;

  const truncatedText =
    nweetObj.text.length > MAX_TEXT_LENGTH
      ? nweetObj.text.slice(0, MAX_TEXT_LENGTH) + "..."
      : nweetObj.text;

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

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
          <div className={styles.modify_box}>
            <div className={styles.modify_head}>
              <h1>내 글 수정하기</h1>
            </div>
            <form onSubmit={onSubmit}>
              <input
                className={styles.modify_input}
                value={newNweet}
                type="text"
                placeholder="수정하실 내용을 입력하세요."
                required
                onChange={onChange}
              />
              <input className={styles.modify_btn} type="submit" value="수정" />
            </form>
            <button className={styles.modify_cancel} onClick={toggleEditing}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.Nweet_Boxssss}>
            <div className={styles.Nweet_Boxs}>
              <div className={styles.nweet_user_box}>
                <div className={styles.icon_box}>
                  <FontAwesomeIcon icon={faUser} className={styles.icon} />
                </div>
                <span>{nweetObj.name}</span>
                <span className={styles.user_date}>{nweetObj.createAt}</span>
                {isOwner && (
                  <>
                    <button onClick={toggleEditing} className={styles.button1}>
                      <FontAwesomeIcon icon={faPen} className={styles.icon1} />
                    </button>
                    <button onClick={onDeleteClick} className={styles.button2}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.icon2}
                      />
                    </button>
                  </>
                )}
              </div>
              <div>
                <h4 className={styles.nweet_text} onClick={showModal}>
                  {truncatedText}{" "}
                  {nweetObj.attachmentUrl && (
                    <FontAwesomeIcon
                      className={styles.image_icon}
                      icon={faImage}
                    />
                  )}
                </h4>
                {modalOpen && (
                  <Modal setModalOpen={setModalOpen} nweetObj={nweetObj} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.footer}></div>
    </div>
  );
};

export default Nweet;
