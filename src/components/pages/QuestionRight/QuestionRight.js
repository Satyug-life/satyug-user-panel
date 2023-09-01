import React, { useRef } from 'react'
import { S3_BUCKET } from '../../../utils/Constants'
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../layouts/ContentLayout/ContentLayout';
import styles from "./QuestionRight.module.scss";

const QuestionRight = () => {
    const navigate = useNavigate();
    const videoRef = useRef();

  return (
    <>
  <div
      className={styles.question_right}
    >
      <video 
      // playsInline
      onEnded={() => navigate("/share")}
      ref={videoRef} 
      autoPlay  
      >
        <source src={S3_BUCKET.BADHAI} type="video/mp4" />
      </video>
      </div>
    </>
  )
}

export default QuestionRight