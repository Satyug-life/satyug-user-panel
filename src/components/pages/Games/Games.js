import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import jaiShriRam from "../../../assets/animations/jai-shri-ram.json";
import { NETWORK_SPEED, S3_BUCKET } from "../../../utils/Constants";
import GameCard from "../../common/Cards/GameCard/GameCard";
import HeadingText from "../../common/HeadingText/HeadingText";
import LottieAnimation from "../../common/LottieAnimation/LottieAnimation";
import styles from "./Games.module.scss";
import GamePlayVideo from "../../common/Modals/GamePlayVideo/GamePlayVideo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Games = () => {
  const [show, setShow] = useState(false);
  const speed = useSelector((state) => state.network.speed);

  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 5,
    infinite: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 389,
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


  let imageUrl = useMemo(() => {
    switch (speed) {
      case NETWORK_SPEED.LOW:
        return S3_BUCKET.BEFORE_GAME_360;
      case NETWORK_SPEED.MEDIUM:
        return S3_BUCKET.BEFORE_GAME_480;
      case NETWORK_SPEED.HIGH:
        return S3_BUCKET.BEFORE_GAME_720;
      default:
        return S3_BUCKET.BEFORE_GAME_360;
    }
  }, [speed]);

  return (
    <section className={styles.games}>
      <Container>
        <div className={styles.games_inner}>
          <HeadingText heading="Kriya" className={styles.games_logo} />
          <LottieAnimation
            animation={jaiShriRam}
            className={styles.animation}
          />
          <Slider
            className="games_slider"
            {...settings}

          >
            <GameCard
              dataAos={{
                "data-aos": "fade-up",
                "data-aos-delay": "400",
              }}
              gameTitle={"Vanner Sena Battle KUMBHKARAN"}
              comingSoon={true}
              setShow={setShow}
              gameImage={`${S3_BUCKET.IMAGES}/game-card1.png`}
            />
            <GameCard
              dataAos={{
                "data-aos": "fade-up",
                "data-aos-delay": "100",
              }}
              setShow={setShow}
              gameTitle={"Ravan at the LAXMAN REKHA"}
              comingSoon={true}

              gameImage={`${S3_BUCKET.IMAGES}/game-card2.png`}
            />
            <GameCard
              dataAos={{
                "data-aos": "fade-up",
                "data-aos-delay": "200",
              }}
              setShow={setShow}
              gameTitle={"RAM MANDIR ka Nirman"}
              gameImage={`${S3_BUCKET.IMAGES}/game-card3.webp`}
              gameImageClass={styles.mandir_card}
            />
            <GameCard
              dataAos={{
                "data-aos": "fade-up",
                "data-aos-delay": "300",
              }}
              setShow={setShow}
              gameTitle={"Search for SANJIVANI BOOTI"}
              comingSoon={true}
              gameImage={`${S3_BUCKET.IMAGES}/game-card4.png`}
            />
            <GameCard
              dataAos={{
                "data-aos": "fade-up",
                "data-aos-delay": "500",
              }}
              setShow={setShow}
              gameTitle={"RAM SENA Battles RAVAN"}
              comingSoon={true}
              gameImage={`${S3_BUCKET.IMAGES}/game-card5.png`}
            />
          </Slider>
        </div>
        {show && <GamePlayVideo
          // video={S3_BUCKET.BEFORE_GAME}
          video={imageUrl}
          onEnded={() => { setShow(false); navigate("/participation") }}
          showButton
          handleClose={() => setShow(false)}
        />}
      </Container>
    </section>
  );
};

export default Games;
