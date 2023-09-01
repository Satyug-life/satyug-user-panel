import React, { useEffect, useState } from "react";
import styles from "./AccessCollectibles.module.scss";
import { Container } from "react-bootstrap";
import { Form, Formik } from "formik";
import Input from "../../common/Formik/Input/Input";
import OTPInput from "react-otp-input";
import PageHeading from "../../common/PageHeading/PageHeading";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCallPost } from "../../../axiosApi/Axios";
import * as Yup from "yup";
import { FORMIK_REGEX, GAME_TOKEN, S3_BUCKET } from "../../../utils/Constants";
import { toasts } from "../../common/Toast/Toast";
import {
  setUserId,
  setUserImageName,
  setUserReferKey,
} from "../../../redux/userDetails/userSlice";
import { useDispatch } from "react-redux";
import { useQuery } from "../../../hooks/useQuery";

const AccessCollectibles = () => {
  const location = useLocation();
  const isProduct = location.pathname.toLowerCase().includes("product");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState("");
  const query = useQuery();
  const emailData = location?.state;
  const initialValues = {
    email: "",
  };
  const [startTimer, setStartTimer] = useState(false);
  const [seconds, setSeconds] = useState(30);
  let interval;
  let initialSeconds = 30;

  const setTime = async () => {
    if (startTimer) {
      interval = setInterval(async () => {
        initialSeconds -= 1;
        if (initialSeconds === 0) {
          clearInterval(interval);
          setStartTimer(false);
        }
        setSeconds(initialSeconds);
      }, 1000);
    }
  };

  const reSetTime = () => {
    setSeconds(30);
    setTime();
  };

  useEffect(() => {
    if (startTimer) {
      setTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTimer]);
  const getUserEmail = async () => {
    try {
      const response = await apiCallPost("/api/v1/satyug/users/verify", {
        userId: query.get("id"),
      });
      if (response.status === 200) {
        setEmail(response.data.email);
        setStartTimer(true);
        reSetTime();
        setResend(true);

      } else {
        // toasts.error(response.message);
        setResend(false);
        navigate("/");

      }
    } catch (e) { }
  };
  useEffect(() => {
    if (query.get("id")) {
      getUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(FORMIK_REGEX.EMAIL_REGEX, "Invalid email"),
  });
  const handleChange = async (val) => {
    if (val.length === 6) {
      let data = {
        email: emailData?.login ? emailData.email : email,
        otp: val,
        type: GAME_TOKEN.Collectible,
      };
      setTimeout(async () => {
        try {
          const response = await apiCallPost(
            "/api/v1/satyug/users/verify-otp",
            data
          );
          if (response?.status === 200) {
            toasts.success("Otp verified successfully");
            dispatch(setUserReferKey(response.data.userKey));
            dispatch(setUserId(response.data.userId));
            dispatch(
              setUserImageName({
                name: response.data.name,
                image: response.data.image,
                email: email,
                phoneNumber: response.data.phoneNumber,
              })
            );

            if (isProduct) {
              navigate("/select-asset" , {state : {isProduct : true}});
            } else {
              navigate("/my-collectibles");
            }
          }
        } catch (e) { }
      }, 500);
    }

    setOtp(val);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await apiCallPost("/api/v1/satyug/users/verify-email", {
        email: values.email || email,
      });
      if (response?.status === 200) {
        toasts.success(response.message);
        if (!email) {
          setEmail(values.email);
        }

        setResend(true);
        setStartTimer(true);
        reSetTime();
      } else {
        setResend(false);
      }
    } catch (e) {
      // toasts.error("fasdf");
    }
  };
  const getDisabled = (formik) => {
    if (resend) {
      if (seconds === 0) {
        return !(formik.dirty || formik.isValid);
      } else return true;
    } else return !(formik.dirty || formik.isValid);
  };
  return (
    <section className={styles.access_collectibles}>
      <Container>
        <div className={styles.access_box}>
          <img
            className={styles.logo}
            src={`${S3_BUCKET.LOGO_HD}`}
            alt="logo"
          />
          <PageHeading
            heading={`Access ${isProduct ? "Products" : "My Collectibles"}`}
            className={styles.heading}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={!query.get("id") ? validationSchema : undefined}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className={styles.mail_form}>
                <Input
                  label="Email ID :"
                  name="email"
                  formik={formik}
                  type="email"
                  disabled={query.get("id")}
                  className={styles.input}
                  placeholder="Lorem @email.com"
                  value={email || formik.values.email}
                />
                <button
                  disabled={getDisabled(formik)}
                  type="submit"
                  className={styles.send_btn}
                >
                  {resend
                    ? `Resend OTP ${seconds !== 0 ? `after ${seconds} seconds` : ""}`
                    : !query.get("id")
                      ? "Send OTP"
                      : `Resend OTP ${seconds !== 0 ? `after ${seconds} seconds` : ""}`}
                </button>
              </Form>
            )}
          </Formik>
          {(resend || query.get("id")) && (
            <>
              <hr className={styles.separator} />
              <div className={styles.otp_input}>
                <h3>Enter OTP</h3>
                <OTPInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default AccessCollectibles;
