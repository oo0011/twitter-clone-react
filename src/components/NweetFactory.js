import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "css/NweetFactory.module.css";
import Nweet from "./Nweet";

const NweetFactory = ({ userObj, nweetObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onUploadButtonClick = () => {
    setShowUpload(true);
  };

  const onUploadCancelButtonClick = () => {
    setShowUpload(false);
  };

  const onUploadFinishButtonClick = () => {
    setTimeout(() => {
      setShowUpload(false);
    }, 1000);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      name: userObj.displayName,
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);

    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);
  return (
    <div className={styles.Upload_Input_Box}>
      <h1 className={styles.Title}>1030</h1>

      <div className={styles.form_box}>
        <form onSubmit={onSubmit}>
          {!showUpload && (
            <button className={styles.Upload_Btn} onClick={onUploadButtonClick}>
              +
            </button>
          )}

          {showUpload && (
            <div className={styles.Upload_Input_Box_2}>
              <input
                className={styles.Input1}
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
              />
              <input
                className={styles.Input1_submit}
                onClick={onUploadFinishButtonClick}
                type="submit"
                value="Nweet"
              />
              <button
                className={styles.delete_btn}
                onClick={onUploadCancelButtonClick}
              >
                취소
              </button>

              <br />
              <div className={styles.filebox}>
                <label className={styles.label} htmlFor="file">
                  Add Photo?
                </label>
                <label className={styles.label_btn} htmlFor="file">
                  +
                </label>
                <input type="file" id="file" onChange={onFileChange} />
              </div>

              {attachment && (
                <div className={styles.img}>
                  <img
                    src={attachment}
                    alt="img"
                    width="200px"
                    height="200px"
                  />
                  <br />
                  <button onClick={onClearAttachment}>삭제</button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      <div className={styles.Nweet_Box}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default NweetFactory;
