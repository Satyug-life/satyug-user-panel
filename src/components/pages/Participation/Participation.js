import React, { useState ,useRef ,useEffect} from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { apiCallPost } from "../../../axiosApi/Axios";
import { ENVIRONMENT, GAME_TOKEN, S3_BUCKET, S3_BUCKET_AUDIO } from "../../../utils/Constants";
import GameCard from "../../common/Cards/GameCard/GameCard";
import HeadingText from "../../common/HeadingText/HeadingText";
import GamePlayVideo from "../../common/Modals/GamePlayVideo/GamePlayVideo";
import GameplayCinematic from "../../common/Modals/GameplayCinematic/GameplayCinematic";
import styles from "./Participation.module.scss";

const Participation = () => {
  const [show, setShow] = useState(false);
  const [showgamplay, setShowGamplay] = useState(false);
  const [video, setVideo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const audioRef= useRef()
  const onPlayClick = async () => {
    setShowGamplay(true);
  };

  const WatchVideoClick = (video) => {
    setVideo(video);
    setShow(true);
  };
  // useEffect(() => {
  //   audioRef?.current && audioRef.current.play();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [audioRef?.current]);

  const gamePlay = async () => {
    setIsLoading(true);

    try {
      let response = await apiCallPost("/api/v1/satyug/users/generate-token", {
        type: GAME_TOKEN.GameAccessToken,
      });
      if (response.status === 200) {
        window.location.replace(
          `${ENVIRONMENT.GAME_URL}/?token=${response.data.token}`
        );
      }
    } catch (e) {
      // setIsValidated(false);
    }
  };
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 399,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 349,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* <audio ref={audioRef} loop>
        <source src={S3_BUCKET_AUDIO.PARTICIPATION} type="audio/mpeg" />
      </audio> */}
      <section className={styles.participation}>
        <Container className="position-relative">
          <HeadingText
            dataAos={{
              "data-aos": "zoom-in",
            }}
            heading="Aap kis bhaag main sehyog krna chahoge"
            className={styles.heading}
          />
          <Slider {...settings}>
            <GameCard
              className={styles.participate_game}
              gameImageClass={styles.participate_game_img}
              dataAos={{
                "data-aos": "zoom-in",
                "data-aos-delay": "100",
              }}
              gameImage={`${S3_BUCKET.MANDIR}`}
              gameTitle={"Ram Mandir Ka Nirman"}
              playCard={true}
              onPlayClick={onPlayClick}
            />
            <GameCard
              className={styles.participate_game}
              gameImageClass={styles.participate_game_img}
              dataAos={{
                "data-aos": "zoom-in",
                "data-aos-delay": "200",
              }}
              gameTitle={"Bhojnalya Ki Dakshina"}
              lockedCard={true}
              gameImage={`${S3_BUCKET.BHOJNALYA}`}
              WatchVideoClick={() => WatchVideoClick(S3_BUCKET.DAKSHINA_GAME)}
            />
            <GameCard
              className={styles.participate_game}
              gameImageClass={styles.participate_game_img}
              dataAos={{
                "data-aos": "zoom-in",
                "data-aos-delay": "300",
              }}
              gameTitle={"Murti Sathapna"}
              lockedCard={true}
              gameImage={`${S3_BUCKET.MURTI_STHAPANA}`}
              WatchVideoClick={() => WatchVideoClick(S3_BUCKET.SATHAPNA_GAME)}
            />
            <GameCard
              className={styles.participate_game}
              gameImageClass={styles.participate_game_img}
              dataAos={{
                "data-aos": "zoom-in",
                "data-aos-delay": "400",
              }}
              gameTitle={"Bageeche Ka Nirmaan"}
              gameImage={`${S3_BUCKET.BAGEECHA}`}
              lockedCard={true}
              WatchVideoClick={() => WatchVideoClick(S3_BUCKET.NIRMAAN_GAME)}
            />
          </Slider>
        </Container>
      </section>
      {show && (
        <GamePlayVideo 
          backButton = {true}
          showButton={false}
          video={video}
          onEnded={() => setShow(false)}
          handleClose={() => setShow(false)}
        />
      )}
      {showgamplay && (
        <GameplayCinematic
          isLoading={isLoading}
          show={showgamplay}
          gamePlay={gamePlay}
          handleClose={() => setShowGamplay(false)}
        />
      )}
    </>
  );
};

export default Participation;
