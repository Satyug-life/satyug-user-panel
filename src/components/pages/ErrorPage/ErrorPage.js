import React from 'react'
import styles from "./ErrorPage.module.scss";
import { Container } from 'react-bootstrap';
import HeadingText from "../../common/HeadingText/HeadingText";
import LottieAnimation from "../../common/LottieAnimation/LottieAnimation";
import animation from "../../../assets/animations/jai-shri-ram.json";
const ErrorPage = () => {
    return (
        <section className={styles.error_page}>
            <Container>
                <LottieAnimation
                    animation={animation}
                    className={styles.animation}
                />
                <HeadingText
                    heading="There's an Error"
                />
            </Container>
        </section>
    )
}
export default ErrorPage