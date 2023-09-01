import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import animation from "../../../assets/animations/fuljhadia.json";
import {
  FacebookIcon,
  TelegramIcon2,
  TwitterIcon,
  WhatsappIcon
} from "../../../assets/svg/svgicons";
import { ENVIRONMENT, NETWORK_SPEED, S3_BUCKET, S3_BUCKET_AUDIO, URL_LINK } from "../../../utils/Constants";
import Button from "../../common/Buttons/Button/Button";
import HeadingText from "../../common/HeadingText/HeadingText";
import LottieAnimation from "../../common/LottieAnimation/LottieAnimation";
import ContentLayout from "../../layouts/ContentLayout/ContentLayout";
import styles from "./Sharepage.module.scss";

const SharePage = () => {
  const navigate = useNavigate();
  const referKey = useSelector((state) => state.userDetails.refer);
  const videoRef = useRef();

  useEffect(() => {
    videoRef?.current && videoRef?.current?.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef?.current]);

  const urlLinks = ENVIRONMENT.URL_LINK + referKey
  const speed = useSelector((state) => state.network.speed);

  let imageUrl = useMemo(() => {
    switch (speed) {
      case NETWORK_SPEED.LOW:
        return S3_BUCKET.SHARE_360;
      case NETWORK_SPEED.MEDIUM:
        return S3_BUCKET.SHARE_480;
      case NETWORK_SPEED.HIGH:
        return S3_BUCKET.SHARE_BACK;
      default:
        return S3_BUCKET.SHARE_360;
    }
  }, [speed]);

  return (
    <ContentLayout
      // rightContentClass={styles.share_right}
      rightContentClass={"d-none"}
      className={styles.share_page}
      hide={true}
      image={S3_BUCKET.SHARE_IMAGE}
      leftContentClass={"mx-auto"}
    >
      <video ref={videoRef} playsInline className={styles.share_page_video} loop>
        <source src={imageUrl} type="video/mp4" />
      </video>
      {/* <audio ref={audioRef} loop>
        <source src={S3_BUCKET_AUDIO.SHARE} type="audio/mpeg" />
      </audio> */}
      <img
        src={`${S3_BUCKET.IMAGES}/archery.png`}
        alt="archery-icon"
        className={styles.archery_icon}
      />
      <HeadingText className={styles.heading} heading="Share" />
      <LottieAnimation className={styles.animation} animation={animation} />
      <ul>
        <li>
          <WhatsappShareButton url={urlLinks}>
            <Link target="_blank" rel="noreferrer">
              <WhatsappIcon />
            </Link>
          </WhatsappShareButton>
        </li>
        <li>
          <FacebookShareButton url={urlLinks}>
            <Link className={styles.fb} target="_blank" rel="noreferrer">
              <FacebookIcon />
            </Link>
          </FacebookShareButton>
        </li>
        <li>
          <TelegramShareButton url={urlLinks}>
            <Link target="_blank" rel="noreferrer">
              <TelegramIcon2 />
            </Link>
          </TelegramShareButton>
        </li>
        <li>
          <TwitterShareButton url={urlLinks}>
            <Link target="_blank" rel="noreferrer">
              <TwitterIcon />
            </Link>
          </TwitterShareButton>
        </li>
        {/* <li>
          <a href="/">
            <RedditIcon2 />
          </a>
        </li>
        <li>
          <a href="/">
            <GithubIcon2 />
          </a>
        </li>
        <li>
          <a href="/">
            <DiscordIcon2 />
          </a>
        </li> */}
      </ul>
      <Button text="Ok" onClick={() => navigate("/navigator")} />
    </ContentLayout>
  );
};

export default SharePage;
