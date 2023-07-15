import React from "react";
import styles from "../css/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Modal({ setModalOpen, nweetObj }) {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.modal_box}>
      <button className={styles.modal_btn} onClick={closeModal}>
        X
      </button>
      <h2 className={styles.title}>1030</h2>
      <div className={styles.modal_box2}>
        <span className={styles.modal_name}>{nweetObj.name}</span>
        <span className={styles.modal_date}>{nweetObj.createAt}</span>
      </div>
      <div className={styles.modal_text_box}>
        <p className={styles.pbox}>
          {" "}
          <div className={styles.icon_box}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </div>
          <span>{nweetObj.text}</span>
        </p>
      </div>

      {nweetObj.attachmentUrl && (
        <img src={nweetObj.attachmentUrl} alt="Attachment" />
      )}
    </div>
  );
}

export default Modal;
