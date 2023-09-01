import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import animation from "../../../assets/animations/particles.json";
import { S3_BUCKET } from '../../../utils/Constants';
import Button from '../../common/Buttons/Button/Button';
import LottieAnimation from '../../common/LottieAnimation/LottieAnimation';
import styles from "./Homepage.module.scss";

const Homepage = () => {
    const navigate = useNavigate();
    const [animationPlaying, setAnimationPlaying] = useState(true);

    const handleAnimationEnd = () => {
        setAnimationPlaying(false);
    };
    return (
        <section className={styles.homepage}>
            <Container>
                <div className={styles.home_inner}>
                    <img style={{ cursor: "pointer" }} className={styles.logo} onClick={() => navigate("/")} data-aos="zoom-in" src={`${S3_BUCKET.LOGO_HD}`} alt="logo" />
                    <div className={styles.home_content}>
                        <div className={styles.home_box} data-aos="fade-up" data-aos-offset="-800" data-aos-delay="400">
                            <img
                                src={`${S3_BUCKET.IMAGES}/darshan.png`}
                                alt="mandir"
                            />
                            <LottieAnimation
                                animation={animation}
                                className={styles.animation}
                                loop={false}
                                playing={animationPlaying}
                                onComplete={handleAnimationEnd}
                            />
                            <Button
                                onClick={() => navigate('/games')}
                                text="Kriya"
                            />
                            <span className={styles.play_btn}>
                                Click to Play
                                <LottieAnimation
                                    animation={animation}
                                    className={`${styles.play_btn_animation} d-sm-block d-none`}
                                />
                            </span>
                        </div>
                        <div className={styles.home_box} data-aos="fade-up" data-aos-offset="-800" data-aos-delay="100">
                            <img src={`${S3_BUCKET.IMAGES}/yog.png`} alt="mandir" />
                            <LottieAnimation
                                animation={animation}
                                className={styles.animation}
                            />
                            <Button
                                onClick={() => navigate('/dhyana')}
                                text="Dhyana"
                            />
                        </div>
                        <div className={styles.home_box} data-aos="fade-up" data-aos-offset="-800" data-aos-delay="200">
                            <img src={`${S3_BUCKET.IMAGES}/yog.png`} alt="mandir" />
                            <LottieAnimation
                                animation={animation}
                                className={styles.animation}
                            />
                            <Button
                                onClick={() => navigate('/yoga')}
                                text="Yog"
                            />
                        </div>
                        <div className={styles.home_box} data-aos="fade-up" data-aos-offset="-800" data-aos-delay="300">
                            <img src={`${S3_BUCKET.IMAGES}/darshan.png`} alt="mandir" />
                            <LottieAnimation
                                animation={animation}
                                className={styles.animation}
                            />
                            <Button
                                onClick={() => navigate('/coming-soon')}
                                text="Darshan"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Homepage
