import React, { useState } from "react";
import styles from "./Backbutton.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { S3_BUCKET } from "../../../utils/Constants";
import DonationModal from "../Modals/DonationModal/DonationModal";
import { CoinIcons } from "../../../assets/svg/svgicons";

const Backbutton = ({ className }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className={`${styles.back_wrap} ${className || ""}`}>
        <button onClick={() => navigate(-1)} className={styles.back_btn}>
          <img src={`${S3_BUCKET.IMAGES}/back-icon.png`} alt="back-icon" />
          Back
        </button>
        {location.pathname === "/participation" && (
          <button className={styles.donate_btn} onClick={() => setShow(true)}>
            <CoinIcons />
            Donate
          </button>
        )}
      </div>
      {show && <DonationModal show={show} handleClose={() => setShow(false)} />}
    </>
  );
};

export default Backbutton;
