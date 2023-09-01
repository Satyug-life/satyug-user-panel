import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { apiCallPost } from "../../../axiosApi/Axios";
import { useQuery } from "../../../hooks/useQuery";
import Backbutton from "../../common/Backbutton/Backbutton";
import styles from "./Homelayout.module.scss";
import { useMemo } from "react";
import { NETWORK_SPEED, SCREEN_SIZE } from "../../../utils/Constants";
import { useDispatch } from "react-redux";
import { setInternetSpeed, setScreenSize } from "../../../redux/networkDetails/NetworkDetails";

const HomeLayout = () => {
  const location = useLocation();
  const [bgImg, setBgImage] = useState(false);
  const query = useQuery();
  const [showBorder, setShowBorder] = useState(false);
  const [showBackBtn, setShowBackbtn] = useState(false);
  const dispatch = useDispatch()

  const showBorderPaths = useMemo(
    () => [
      "/continue ",
      "/participation",
      "/login",
      "/question",
      "/share",
      "/contact",
    ],
    []
  );
  const showBackBtnPaths = useMemo(
    () => ["/games", "/continue", "/participation", "/contact"],
    []
  );

  useEffect(() => {
    location.pathname === "/question" ? setBgImage(true) : setBgImage(false);
    setShowBorder(
      showBorderPaths.filter((item) => location.pathname === item).length > 0
    );
    setShowBackbtn(
      showBackBtnPaths.filter((item) => location.pathname === item).length > 0
    );
  }, [location, showBackBtnPaths, showBorderPaths]);
  // window.onresize = () => {
  //   if (document.body.clientWidth > 1280 && window.innerHeight > 720) {
  //     dispatch(setScreenSize(SCREEN_SIZE.DESKTOP));
  //   } else if (document.body.clientWidth > 601 && window.innerHeight > 720) {
  //     dispatch(setScreenSize(SCREEN_SIZE.TAB));
  //   } else if (document.body.clientWidth > 320 && window.innerHeight > 320) {
  //     dispatch(setScreenSize(SCREEN_SIZE.MOBILE));
  //   } else {
  //     dispatch(setScreenSize(SCREEN_SIZE.MOBILE));
  //   }
  // }
  useEffect(() => {
    let userImageLink =
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png" + "?&" + Date.now();
    let downloadSize = 83600;
    let downloadImgSrc = new Image();
    let end_time;
    downloadImgSrc.onload = function () {
      end_time = new Date().getTime();
      displaySpeed();
    };
    let time_start = new Date().getTime();
    downloadImgSrc.src = userImageLink;

    const displaySpeed = () => {
      let timeDuration = (end_time - time_start) / 1000;
      let loadedBits = downloadSize * 8;
      let bps = (loadedBits / timeDuration).toFixed(2);
      let speedInKbps = (bps / 1024).toFixed(2);
      if (speedInKbps < 350) {
        dispatch(setInternetSpeed(NETWORK_SPEED.LOW))
      } else if (speedInKbps > 350 && speedInKbps < 750) {
        dispatch(setInternetSpeed(NETWORK_SPEED.MEDIUM))
      } else if (speedInKbps > 750 && speedInKbps < 2500) {
        dispatch(setInternetSpeed(NETWORK_SPEED.HIGH))
      } else {
        dispatch(setInternetSpeed(NETWORK_SPEED.HIGH))
      }
    }
    if (document.body.clientWidth > 1280 && window.innerHeight > 720) {
      dispatch(setScreenSize(SCREEN_SIZE.DESKTOP));
    } else if (document.body.clientWidth > 601 && window.innerHeight > 720) {
      dispatch(setScreenSize(SCREEN_SIZE.TAB));
    } else if (document.body.clientWidth > 320 && window.innerHeight > 320) {
      dispatch(setScreenSize(SCREEN_SIZE.MOBILE));
    } else {
      dispatch(setScreenSize(SCREEN_SIZE.MOBILE));
    }
  }, [])
  useEffect(() => {
    let id = query?.get("id");
    const getKarmaPoints = async () => {
      try {
        await apiCallPost("api/v1/satyug/users/karmaPoints", {
          id: id,
          type: "share",
        });
      } catch (error) { }
    };

    if (id) {
      if (location.pathname === "/games") {
        getKarmaPoints();
      }
    }
  }, []);

  return (
    <main
      className={`${styles.home_layout} ${location.pathname.includes("/share") ? styles.video_bg : ""
        } ${bgImg ? styles.ques_bg : ""}`}
    >
      {showBackBtn && <Backbutton />}
      {showBorder && <div className={styles.bordered_bg} />}
      <Outlet />
    </main>
  );
};

export default HomeLayout;
