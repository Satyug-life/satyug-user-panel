import React, { useState, useCallback, useEffect, useRef } from "react";
import styles from "./DonationModal.module.scss";
import { Modal } from "react-bootstrap";
import { CoinIcons, CrossIcon } from "../../../../assets/svg/svgicons";
import { Form, Formik } from "formik";
import Input from "../../Formik/Input/Input";
import Button from "../../Buttons/Button/Button";
import * as Yup from "yup";
import {
  ENVIRONMENT,
  FORMIK_REGEX,
  S3_BUCKET_AUDIO,
} from "../../../../utils/Constants";
import useRazorpay from "react-razorpay";
import { apiCallPatch, apiCallPost } from "../../../../axiosApi/Axios";
import { toasts } from "../../Toast/Toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../../redux/loader";
const DonationModal = ({ show, handleClose }) => {
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  const [Razorpay] = useRazorpay();
  const audioRef = useRef();

  useEffect(() => {
    audioRef?.current && audioRef.current.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef?.current]);

  const paymentHandler = async (res, orderId, status) => {
    try {
      let payload = {
        status: status,
        razorpayPaymentId: res.razorpay_payment_id,
      };
      const response = await apiCallPatch(
        `/api/v1/satyug/donation/${orderId}`,
        payload
      );
      if (response.status === 200) {
        toasts.success(response.message);
        dispatch(setLoader(false));
        handleClose();
      } else {
        dispatch(setLoader(false));
        toasts.error(response.message);
      }
    } catch (err) {
      dispatch(setLoader(false));
    }
  };

  const paymentSignature = async (res, orderId) => {
    dispatch(setLoader(true));
    try {
      const response = await axios.post(
        `${ENVIRONMENT.RAZORPAY_URL}/razorPay/v1/payment/verify_payment_signature`,
        res
      );
      if (response.status === 200) {
        paymentHandler(res, orderId, "SUCCESS");
      } else if (response.status === 400) {
        paymentHandler(res, orderId, "FAILED");
      }
    } catch (err) {
      toasts.error(err);
      dispatch(setLoader(false));
    }
  };

  const handlePayment = useCallback(
    async (orderId) => {
      const options = {
        key: ENVIRONMENT.RAZORPAY_KEY,
        order_id: orderId,
        handler: (res) => {
          paymentSignature(res, orderId);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Razorpay]
  );
  const initialValues = {
    amount: "",
    emailId: "",
  };
  const handleSubmit = async (values) => {
    try {
      const response = await apiCallPost("/api/v1/satyug/donation", {
        amount: values.amount,
        userId: values.emailId,
      });
      if (response.status === 200) {
        handlePayment(response.data.orderId);
      } else {
        toasts.error("Something went wrong");
      }
    } catch (err) { }
  };
  const amountButtons = [
    {
      value: 50,
      label: 50,
    },
    {
      value: 100,
      label: 100,
    },
    {
      value: 500,
      label: 500,
    },
  ];
  const validationSchema = Yup.object().shape({
    emailId: Yup.string()
      .required("Email is required")
      .matches(FORMIK_REGEX.EMAIL_REGEX, "Invalid email"),
    amount: Yup.number("Only numbers are allowed")
      .min(1)
      .max(1000000, "Maximum Rs.1000000 is allowed")
      .integer()
      .required("Amount is required"),
  });
  return (
    <>
      <audio ref={audioRef} loop>
        <source src={S3_BUCKET_AUDIO.DONATE} type="audio/mpeg" />
      </audio>
      <Modal
        show={show}
        className={styles.donation_modal}
        onHide={handleClose}
        centered
      >
        <Modal.Header>
          <button onClick={handleClose} className={styles.close_btn}>
            <CrossIcon />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Input
                    label="Enter Email Id:"
                    placeholder="Enter Email Id"
                    formik={formik}
                    name="emailId"
                    className={`${styles.input} ${styles.emailId}`}
                  />
                  <Input
                    type="number"
                    label="Enter Amount to Donate:"
                    className={styles.input}
                    placeholder="Enter Amount to Donate"
                    formik={formik}
                    name="amount"
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", ".", "*", "/"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                  />
                  <ul>
                    {amountButtons.map((item) => (
                      <li key={item.value}>
                        <button
                          type="button"
                          onClick={() => {
                            setActive(item.value);
                            formik.setFieldValue("amount", item.value);
                          }}
                          className={active === item.value ? styles.active : ""}
                        >
                          <CoinIcons />
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex align-items-center justify-content-center">
                    <Button
                      text="Proceed"
                      type="submit"
                      className={styles.proceed_btn}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DonationModal;
