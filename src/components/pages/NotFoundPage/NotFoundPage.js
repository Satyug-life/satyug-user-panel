import React from 'react'
import HeadingText from '../../common/HeadingText/HeadingText'
import PageHeading from '../../common/PageHeading/PageHeading'
import styles from "../ErrorPage/ErrorPage.module.scss";
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SecondaryBtn from '../../common/Buttons/SecondaryBtn/SecondaryBtn';
import { SadIcon } from '../../../assets/svg/svgicons';
import LottieAnimation from '../../common/LottieAnimation/LottieAnimation';
import animation from '../../../assets/animations/jai-shri-ram.json';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.not_found}>
            <Container>
                <LottieAnimation
                    className={styles.animation}
                    animation={animation}
                />
                <div
                    data-aos="zoom-in"
                    data-aos-duration="800"
                    className="mb-5 text-center">
                    <SadIcon />
                </div>
                <HeadingText
                    dataAos={{
                        "data-aos": "fade-up",
                        "data-aos-delay": "200"
                    }}
                    heading="404 Error"
                />
                <PageHeading
                    className="text-center mt-5"
                    heading="Page Not Found"
                />
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <SecondaryBtn
                        text="Back"
                        onClick={() => navigate(-1)}
                    />
                </div>
            </Container>
        </section>
    )
}

export default NotFoundPage
