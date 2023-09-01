import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { S3_BUCKET } from '../../../utils/Constants';
import SiteDescription from '../../common/Modals/SiteDescription/SiteDescription';
import styles from "./HomeVideo.module.scss";

const HomeVideo = () => {

    const [playing, setPlaying] = useState(false);
    const vidRef = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handlePlayVideo = () => {
        vidRef.current.play()
        setPlaying(true);
    }


    function updateVideoQuality(e) {
        const connectionType = navigator.connection.effectiveType; // 'slow-2g', '2g', '3g', '4g', or 'unknown'
        if (vidRef.current) {
            let sources = vidRef.current.querySelectorAll("source");
            let selectedSource = sources[0]; // Default to lowest quality

            if (connectionType === '4g' || (navigator.connection.downlink >= 10 && navigator.connection.rtt <= 50)) {
                selectedSource = sources[1]; // High quality for fast connections
            }
            vidRef.current.src = selectedSource.src;
            if (e) {
                vidRef.current.play();
            }
        }
    }

    // Call the function initially and whenever the network conditions change
    useEffect(() => {
        // updateVideoQuality();
        // navigator.connection.addEventListener('change', updateVideoQuality);
    }, [])




    return (
        <section className={styles.home_video}>
            <video
                onEnded={() => { navigate("/navigator") }}
                playsInline
                ref={vidRef}
                poster={S3_BUCKET.SATYUG_VIDEO_POSTER}
            >
                {/* <source src={S3_BUCKET.SATYUG_VIDEO_LOW} type="video/mp4" /> */}
                <source src={S3_BUCKET.SATYUG_VIDEO} type="video/mp4" />

            </video>
            {
                !playing
                &&
                <>
                    <div className={styles.home_content}>
                        <button onClick={handlePlayVideo}>
                            <img src={S3_BUCKET.CLICK_TO_ENTER_TEXT} alt="click-to-enter-text" />
                        </button>
                        <img className={styles.logo} data-aos="zoom-in" data-aos-duration="800" data-aos-offset="-500" src={`${S3_BUCKET.OLD_LOGO}`} alt="logo" />
                        <button onClick={() => navigate("/about-us")}>
                            <img src={S3_BUCKET.ABOUT_US_TEXT} alt="about-us-text" />
                        </button>
                    </div>
                    <div className={styles.home_footer}>
                        <h3>Satyug</h3>
                        <ul>
                            <li>
                                <Link target="_blank" rel="noopener noreferrer" to="https://drive.google.com/file/d/1ajamewqmu4OmSuH4AkC6qyGQcUrxov0O/view">
                                    Satyug Whitepaper
                                </Link>
                            </li>
                            <li>
                                <Link target="_blank" rel="noopener noreferrer" to="https://drive.google.com/file/d/1ct1NoGnshhZyKzGwRNzRzT85uQ_ERSuE/view">Satyug Pitch Deck</Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to=""
                                    onClick={e => { e.preventDefault(); setShow(true) }}
                                >
                                    Satyug Description
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            }
            {
                playing &&
                // <button className={styles.skip_btn} onClick={() => navigate('/navigator')}>Skip <RightArrows /></button>
                // <Button
                //     className={styles.skip_btn}
                //     onClick={() => navigate('/navigator')}
                //     text={<>Skip <RightArrows /></>}
                // />
                <button
                    className={styles.skip_btn}
                    onClick={() => navigate("/navigator")}>
                    Skip
                </button>
            }
            <SiteDescription show={show} handleClose={() => setShow(false)} />
        </section>
    )
}

export default HomeVideo
