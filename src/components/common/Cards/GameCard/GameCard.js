import React from "react";
import fireSparkles from "../../../../assets/animations/particles.json";
import { S3_BUCKET } from "../../../../utils/Constants";
import Button from "../../Buttons/Button/Button";
import LottieAnimation from "../../LottieAnimation/LottieAnimation";
import styles from "./GameCard.module.scss";

const GameCard = ({
  playCard,
  dataAos,
  gameImage,
  gameImageClass,
  gameTitle,
  comingSoon,
  lockedCard,
  className,
  onPlayClick,
  WatchVideoClick,
  setShow
}) => {

  const handlePlayNow = () => {
    setShow(true)
  };

  return (
    <div
      {...dataAos}
      className={`${styles.game_card} ${playCard ? styles.play_card : ""} ${lockedCard ? styles.locked_card : ""} ${className || ""
        }`}
    >
      <div className={styles.game_inner}>
        <span className={styles.left_arrow}>
          <img src={`${S3_BUCKET.IMAGES}/game-left-arrow.png`} alt="" />
        </span>
        <span className={styles.right_arrow}>
          <img src={`${S3_BUCKET.IMAGES}/game-right-arrow.png`} alt="" />
        </span>
        <span className={styles.archery_icon}>
          <img
            src={`${S3_BUCKET.IMAGES}/game-archery-2.png`}
            alt="archery-icon"
          />
        </span>
        <div className={`${styles.game_image} ${comingSoon ? styles.coming_soon : ""} ${gameImageClass || ""}`}>
          <img src={gameImage} alt="game" />
        </div>
        <div className={styles.game_title}>
          <h2>{gameTitle}</h2>
          {comingSoon && (
            <div className={styles.coming_soon_img}>
              <p>Coming Soon</p>
              <img
                src={`${S3_BUCKET.IMAGES}/coming-soon-game.png`}
                alt="coming-soon"
              />
            </div>
          )}
          {lockedCard && (
            <div className={`${styles.coming_soon_img} ${styles.locked_img}`}>
              <img src={`${S3_BUCKET.IMAGES}/lockedgame.png`} alt="lock" />
            </div>
          )}
        </div>
        <LottieAnimation
          animation={fireSparkles}
          className={styles.fire_sparkles}
        />
        {comingSoon ? null : playCard ? (
          <Button
            // onClick={() => navigate('/login')}
            text="Play For Free"
            variant="secondary-btn"
            className={styles.action_btn}
            onClick={onPlayClick}
          />
        ) : lockedCard ? (
          <Button
            onClick={WatchVideoClick}
            text="Watch Video"
            variant="secondary-btn"
            className={styles.action_btn}
          />
        ) : (
          <Button
            text="Play Now"
            className={styles.action_btn}
            onClick={handlePlayNow}
          />
        )}
      </div>
    </div>
  );
};

export default GameCard;
