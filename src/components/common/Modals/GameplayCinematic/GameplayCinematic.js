import React, { useRef, useState } from "react";
import { S3_BUCKET } from "../../../../utils/Constants";
import Button from "../../Buttons/Button/Button";
import styles from "./GameplayCinematic.module.scss";

const GameplayCinematic = ({ gamePlay ,isLoading }) => {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef()
  const onVideoEnd = () => {
    setShowButton(true);
    videoRef.current.play()

  };
  return (
    <>
      <div
        className={styles.gameplay_cinematic}
      >
        <video ref={videoRef} playsInline autoPlay onEnded={onVideoEnd}>
          <source src={S3_BUCKET.CINEMATIC_GAME} type="video/mp4" />
        </video>
        {showButton && (
          <Button noAos={true} loading={isLoading} onClick={gamePlay} className={styles.continue_btn}>Continue To Game</Button>
        )}
      </div>
    </>
  );
};

export default GameplayCinematic;
