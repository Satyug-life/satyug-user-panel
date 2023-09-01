import React from 'react';
import styles from "./Dhyana.module.scss";
import VideoLayout from '../../layouts/VideoLayout/VideoLayout';
import { S3_BUCKET } from '../../../utils/Constants';
const dhyanaVideo = S3_BUCKET.DHYANA_VIDEO;
const dhyanaVideolow = S3_BUCKET.DHYANA_VIDEO_LOW;

const Dhyana = () => {
    return (
        <VideoLayout
            video={dhyanaVideo}
            lowQualityVideo={dhyanaVideolow}
            className={styles.yoga}
        />
    )
}

export default Dhyana
