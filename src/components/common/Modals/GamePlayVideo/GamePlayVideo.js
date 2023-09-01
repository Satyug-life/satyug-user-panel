import React from 'react';
import Button from '../../Buttons/Button/Button';
import styles from "./GamePlayVideo.module.scss";
import { useNavigate } from 'react-router-dom';
import { S3_BUCKET } from '../../../../utils/Constants';

const GamePlayVideo = ({ handleClose, video, onEnded, showButton, backButton }) => {
    const navigate = useNavigate();
    // let videoDetails = [
    //     {
    //         label: "DESKTOP",
    //         video: S3_BUCKET.BEFORE_GAME_720,
    //         size: "43.4MB",
    //     },
    //     {
    //         label: "TAB",
    //         video: S3_BUCKET.BEFORE_GAME_480,
    //         size: "16.0MB",
    //     },
    //     {
    //         label: "MOBILE",
    //         video: S3_BUCKET.BEFORE_GAME_360,
    //         size: "12.7MB",
    //     },
    // ];
    return (
        <>
            <div
                className={styles.gamplay_modal}
            >
                {/* <button onClick={handleClose} className={styles.crossIcon}><CrossIcon /></button> */}
                {/* {
                    videoDetails.filter(item => item.video === video).length > 0 &&
                    <div className={styles.video_details}>
                        <ul>
                            <li>
                                <p>Label : {videoDetails.filter(item => item.video === video)[0]?.label}</p>
                            </li>
                            <li>
                                <p>Video Size : {videoDetails.filter(item => item.video === video)[0]?.size}</p>
                            </li>
                        </ul>
                    </div>
                } */}
                <video
                    autoPlay
                    playsInline

                    onEnded={onEnded}
                >
                    <source src={video} type="video/mp4" />
                </video>
                {showButton && <button onClick={() => navigate("/participation")} className={`${styles.back_btn} ${styles.skip_btn}`} >Skip</button>}
                {backButton && <Button onClick={() => handleClose()} className={styles.back_btn}>Back</Button>}
            </div>
        </>
    )
}

export default GamePlayVideo
