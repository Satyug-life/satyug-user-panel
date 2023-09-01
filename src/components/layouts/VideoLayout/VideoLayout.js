import React, { useEffect, useRef } from 'react';
import styles from "./VideoLayout.module.scss";
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Buttons/Button/Button';

const VideoLayout = ({ video, className,NobackBtn, lowQualityVideo }) => {
    const navigate = useNavigate();
    const vidRef = useRef();

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
        <section className={`${styles.video_layout} ${className || ""}`}>
            <video
                ref={vidRef}
                playsInline
                onEnded={() => navigate("/navigator")}
                autoPlay
            >
                {/* <source src={lowQualityVideo} type="video/mp4" /> */}
                <source src={video} type="video/mp4" />
            </video>
            {!NobackBtn && <Button
                className={styles.back_btn}
                onClick={() => navigate(-1)}
                text={"Back"}
            />}
        </section>
    )
}

export default VideoLayout
