import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { S3_BUCKET } from "../../../utils/Constants";
import styles from "./ContentLayout.module.scss";
const ContentLayout = ({ children, className, leftContentClass, image, rightContentClass, videoRef }) => {
  const location = useLocation();
  return (
    <section className={`${styles.content_layout} ${className || ""}`}>
      <Container>
        <div className={styles.content_inner}>
          <div className={`${styles.content_left} ${leftContentClass || ""}`}>
            <div className={styles.content_left_inner}>{children}</div>
          </div>
          <div className={`${styles.content_right} ${rightContentClass || ""}`}>
            {
              location.pathname === "/login" &&
                <video
                  
                  playsInline
                  ref={videoRef}
                >
                  <source src={S3_BUCKET.SHARE_PAGE_VIDEO} type="video/mp4" />
                </video>
                // :
                // <img data-aos='fade-down' data-aos-offset="-400" data-aos-delay="400" src={image || `${S3_BUCKET.IMAGES}/share-image.webp`} alt="hanuman-ji" />
            }
          </div>
        </div>
      </Container>
    </section>
  );
};
export default ContentLayout;