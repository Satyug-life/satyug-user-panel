import { Form, Formik } from "formik";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import animation from "../../../assets/animations/fuljhadia.json";
import { apiCallPost } from "../../../axiosApi/Axios";
import {
  setUserDetails,
  setUserId,
  setUserReferKey,
} from "../../../redux/userDetails/userSlice";
import {
  FORMIK_REGEX,
  GAME_TOKEN,
  S3_BUCKET,
  S3_BUCKET_AUDIO,
} from "../../../utils/Constants";
import SecondaryBtn from "../../common/Buttons/SecondaryBtn/SecondaryBtn";
import FormControl from "../../common/Formik/FormControl";
import HeadingText from "../../common/HeadingText/HeadingText";
import LottieAnimation from "../../common/LottieAnimation/LottieAnimation";
import ContentLayout from "../../layouts/ContentLayout/ContentLayout";
import styles from "./Login.module.scss";
import { useQuery } from "../../../hooks/useQuery";
import { Modal } from "react-bootstrap";
import Button from "../../common/Buttons/Button/Button";
import PhoneInput from "../../common/Formik/PhoneInput/PhoneInput";

const Login = () => {
  const initialValues = {
    name: "",
    whatsapp: "",
    emailId: "",
  };
  const query = useQuery();
  const dispatch = useDispatch();
  const [played, setPlayed] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const userDetails = useSelector((state) => state.userDetails);
  const loggedIn = useSelector((state) => state.userDetails.token);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const videoRef = useRef();

  useEffect(() => {
    const state = { page: "games" };
    window.history.pushState(state, "", "");

    const handlePopState = (event) => {
      if (event.state && event.state.page === "games") {
        navigate("/games");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    if (!loggedIn) {
      if (query.get("token")) {
        (async () => {
          try {
            let response = await apiCallPost(
              "/api/v1/satyug/users/validate-token",
              {
                id: query.get("token"),
                type: GAME_TOKEN.GameVerifyToken,
              }
            );
            if (response.status === 200) {
              let payload = {
                collectiveId: query.get("collectiveId"),
                token: response.data.token,
              };
              dispatch(setUserDetails(payload));
              navigate("/login")
            } else {
              localStorage.clear();
              navigate("/")
            }
          } catch (e) {
            navigate("/")
          }
        })();
      } else {
        navigate("/")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let intervalId;
    if (played) {
      intervalId = setInterval(playAudioInterval, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [played]);

  function playAudio() {
    if (!played) {
      if (videoRef?.current) {
        videoRef.current.play();
        setPlayed(true);
      }
    }
  }
  function playAudioInterval() {
    if (videoRef?.current) {
      videoRef.current.play();
    }
  }

  const onSubmit = async (values) => {
    setIsLoading(true)
    const cleanedPhoneNumber = values.whatsapp.replace("+", "");
    let data = {
      name: values.name,
      phoneNumber: cleanedPhoneNumber,
      email: values.emailId,
      collectiveId: userDetails.collectiveId,
      token: userDetails.token,
    };
    try {
      let response = await apiCallPost(
        "/api/v1/satyug/users/collective",
        data,
        {},
        true,
        true
      );

      if (response.status === 200) {
        dispatch(setUserId(response.data.userId));
        dispatch(setUserReferKey(response.data.userKey));
        navigate("/question");
      }else{
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(
        40,
        "Name must be between 2-40 characters, only alphabets are allowed."
      )
      .min(
        2,
        "Name must be between 2-40 characters, only alphabets are allowed."
      )
      .matches(FORMIK_REGEX.ALPHA_REGEX, "Only alphabets are allowed."),
    whatsapp: Yup.string()
      .required("WhatsApp number is required")
      .matches(
        FORMIK_REGEX.MOBILE_NUMBER_REGEX,
        "WhatsApp number must be between 5-16 numbers"
      )
      .min(5, "WhatsApp number must be between 5-16 numbers")
      .max(16, "WhatsApp number must be between 5-16 numbers"),

    emailId: Yup.string()
      .required("Email is required")
      .matches(FORMIK_REGEX.EMAIL_REGEX, "Enter valid email address"),
  });

  return (
    <>
      <div onClick={playAudio}>
        <ContentLayout videoRef={videoRef} className={styles.login_page}>
          <img
            data-aos="fade-up"
            className={styles.archery_icon}
            src={`${S3_BUCKET.IMAGES}/archery.png`}
            alt="archery"
          />
          <HeadingText heading="Satyug" className={styles.logo} />
          <LottieAnimation className={styles.animation} animation={animation} />
          {/* <audio ref={audioRef} loop>
          <source src={S3_BUCKET_AUDIO.AFTER_GAME} type="audio/mpeg" />
        </audio> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormControl
                    className={styles.input}
                    label="Name :"
                    formik={formik}
                    name="name"
                    placeholder="Enter Your Name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  <PhoneInput
                    id="whatsapp"
                    international
                    control="input"
                    className={styles.input}
                    name="whatsapp"
                    label="WhatsApp :"
                    formik={formik}
                    defaultCountry="IN"
                    onChange={(value) => {
                      formik.setFieldValue("whatsapp", value);
                    }}
                  />
                  <FormControl
                    className={styles.input}
                    type="email"
                    placeholder="Example@email.com"
                    label="Email ID :"
                    name="emailId"
                    formik={formik}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailId}
                  />
                  <SecondaryBtn loading={isLoading} type="submit" text="Submit" />
                </Form>
              );
            }}
          </Formik>
        </ContentLayout>
        <Modal
          keyboard={false}
          show={show}
          centered
          onHide={() => setShow(false)}
          backdropClassName={"thanks_backdrop"}
          className={styles.thanks_modal}
        >
          <Modal.Body>
            <img
              data-aos="fade-up"
              className={styles.archery_icon}
              src={`${S3_BUCKET.IMAGES}/archery.png`}
              alt="archery"
            />
            <p>
              Thank you <br /> for your participation.
            </p>
            <Button
              autoFocus
              text="Continue"
              onClick={() => setShow(false)}
              className={styles.continue_btn}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Login;
