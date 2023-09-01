import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  DiscordIcon,
  GithubIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
} from "../../../assets/svg/svgicons";
import PageHeading from "../../common/PageHeading/PageHeading";
import styles from "./AboutUs.module.scss";
import { NETWORK_SPEED, S3_BUCKET, SCREEN_SIZE } from "../../../utils/Constants";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const aboutRef = useRef();
  const speed = useSelector((state) => state.network.speed);
  const screen = useSelector((state) => state.network.screen);

  let imageUrl = useMemo(() => {
    switch (speed) {
      case NETWORK_SPEED.LOW:
        return S3_BUCKET.ABOUT_US_LOW;
      case NETWORK_SPEED.MEDIUM:
        return S3_BUCKET.ABOUT_US_480;
      case NETWORK_SPEED.HIGH:
        return S3_BUCKET.ABOUT_US_720;
      default:
        return S3_BUCKET.ABOUT_US_LOW;
    }
    // if (screen === SCREEN_SIZE.DESKTOP && speed === NETWORK_SPEED.HIGH) {
    //   return S3_BUCKET.ABOUT_US_HIGH;
    // } else if (screen === SCREEN_SIZE.DESKTOP && speed === NETWORK_SPEED.MEDIUM) {
    //   return S3_BUCKET.ABOUT_US_480;
    // } else if (screen === SCREEN_SIZE.TAB && speed === NETWORK_SPEED.HIGH) {
    //   return S3_BUCKET.ABOUT_US_480;
    // } else if (screen === SCREEN_SIZE.MOBILE) {
    //   return S3_BUCKET.ABOUT_US_LOW;
    // } else {
    //   return S3_BUCKET.ABOUT_US_LOW;
    //}
  }, [speed]);

  return (
    <section className={styles.about_us}>
      <video
        ref={aboutRef}
        playsInline
        loop
        autoPlay
        className={styles.about_video}
        muted
        // controls={true}
        poster={S3_BUCKET.ABOUT_US_POSTER}
      >
        <source data-quality="high" src={imageUrl} type="video/mp4" />
      </video>
      <Container>
        <div className={styles.about_content}>
          <PageHeading
            heading='Sat in Sanskrit stands for " Right and Truthful" and Yug stands for "Period of Time"'
            className={styles.heading}
          />
          <ul className={styles.about_list}>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <strong>Ram Setu - </strong>
              Invoke human consciousness through the power of memes
            </li>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <strong>Dhyana - </strong> Get Paid for doing Nothing at all
            </li>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
              data-aos-offset="-100"
            >
              <strong>Darshan - </strong> Virtual Religious Tourism in VR.
            </li>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
              data-aos-offset="-100"
            >
              <strong>Kriya - </strong> A Mythological game based in the year
              3198 BC, set by Alien-Gods
            </li>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
              data-aos-offset="-100"
            >
              <strong>Yoga - </strong> Perform Yoga. We pay you for that.
            </li>
          </ul>
          <footer>
            <ul className={styles.footer_links}>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://drive.google.com/file/d/1ajamewqmu4OmSuH4AkC6qyGQcUrxov0O/view"
                >
                  Satyug Whitepaper
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://drive.google.com/file/d/1ct1NoGnshhZyKzGwRNzRzT85uQ_ERSuE/view"
                >
                  Satyug Pitch Deck
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://drive.google.com/file/d/1rsBhLs-s0qUQ6rc_TX6YLQwPGe3JoxW8/view?inf_contact_key=f14ee117e3038e309511d89173de73e6"
                >
                  Presentation
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://drive.google.com/file/d/1Belf7bb5BlxxeiUBMqAnMPAS-y6nUjCa/view?inf_contact_key=2d8a0feb549df612b0b9d9457e805209"
                >
                  VR Presentation
                </Link>
              </li>
              <li>
                <Link to="/contact">Contact-Us</Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://docs.google.com/presentation/d/1DlY6hdYjiM6-CYn_JhEgONFc2--hqg5WM6v3EKg9a6Y/edit#slide=id.g77ae687167_0_1119"
                >
                  {" "}
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://docs.google.com/document/d/1dQSDkBRfkNLlzRqnqIvkKYim4nlE7qWUj18LJm1Efiw/edit"
                >
                  {" "}
                  Tokenomics
                </Link>
              </li>
            </ul>
            <div className={styles.footer_details}>
              <p className={styles.copy_right}>
                Satyug © {new Date().getFullYear()} Company, Inc
              </p>
              <ul className={styles.footer_social}>
                <li>
                  <a
                    href="https://twitter.com/SatyugLife"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Satyug-life/Satyug-website"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/Tg5m53ah"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <DiscordIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/satyug/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RedditIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/+h5ablpKtH39mYzg1 "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TelegramIcon />
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
