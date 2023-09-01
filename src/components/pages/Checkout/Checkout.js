import React, { useState, useCallback } from "react";
import styles from "./Checkout.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Input from "../../common/Formik/Input/Input";
import { Form, Formik } from "formik";
import PageHeading from "../../common/PageHeading/PageHeading";
import Button from "../../common/Buttons/Button/Button";

import * as Yup from "yup";
import { ENVIRONMENT, FORMIK_REGEX, S3_BUCKET } from "../../../utils/Constants";
import { apiCallPatch, apiCallPost } from "../../../axiosApi/Axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import SuccessModal from "../../common/Modals/SuccessModal/SuccessModal";
import { debouncing, validatePincode } from "../../../utils/utils";
import axios from "axios";
import { toasts } from "../../common/Toast/Toast";
import PhoneInput from "../../common/Formik/PhoneInput/PhoneInput";
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(
      "40",
      "First name must be between 2-40 characters,Only alphabets are allowed."
    )
    .matches(/^\S*$/, "Whitespace is not allowed")
    .min(
      "2",
      "First name must be between 2-40 characters, Only alphabets are allowed."
    )
    .matches(FORMIK_REGEX.ALPHA_REGEX, "Only alphabets are allowed."),
  lastName: Yup.string()
    .required("Last name is required")
    .max(
      "40",
      "Last name must be between 2-40 characters,Only alphabets are allowed."
    )
    .min(
      "2",
      "Last name must be between 2-40 characters,Only alphabets are allowed."
    )
    .matches(/^\S*$/, "Whitespace is not allowed")
    .matches(FORMIK_REGEX.ALPHA_REGEX, "Only alphabets are allowed."),
  emailId: Yup.string()
    .matches(FORMIK_REGEX.EMAIL_REGEX, "Enter a valid email address")
    .required("Email is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(FORMIK_REGEX.MOBILE_NUMBER_REGEX, "Enter valid Contact number"),
  address: Yup.string()
    .required("Please enter your address")
    .max(300)
    .matches(FORMIK_REGEX.ADDRESS_REGEX, "Enter valid address"),
  city: Yup.string().required("Please enter your city"),
  state: Yup.string().required("Please enter your State/UT"),

  // billingAddress: Yup.string().required("Please enter your billing address"),
   pincode: Yup.string().required("Please enter your pincode"),
});

const Checkout = () => {
  const [Razorpay] = useRazorpay();
  const userId = useSelector((state) => state.userDetails.userId);
  const name = useSelector((state) => state.userDetails.name);
  const phoneNumber = useSelector((state) => state.userDetails.phoneNumber);
  const email = useSelector((state) => state.userDetails.email);
  const navigate = useNavigate();
  const [pinCodeError, setPinCodeError] = useState({});
  const location = useLocation();
  const { state } = location;

  const initialValues = {
    firstName: name,
    lastName: "",
    emailId: email,
    contact: phoneNumber,
    address: "",
    city: "",
    state:'',
    // billingAddress: "",
    pincode: "",
  };

  const paymentHandler = async (res, orderId, type) => {
    try {
      let payload = {
        paymentMode: "card",
        status: type,
        productId: state.selectedProduct.id,
        razorpayPaymentId: res.razorpay_payment_id,
        qty: state.quantity,
      };
      const response = await apiCallPatch(
        `/api/v1/satyug/orders/${orderId}`,
        payload
      );
      if (response.status === 200) {
        navigate("/select-asset", {
          state: {
            success: true,
            isProduct : true
          },
        });
      } 
    } catch (err) { }
  };
  const paymentSignature = async (res, orderId) => {
    try {
      const response = await axios.post(
        `${ENVIRONMENT.RAZORPAY_URL}/razorPay/v1/payment/verify_payment_signature`,
        res
      );
      if (response.status === 200) {
        paymentHandler(res, orderId, "success");
      } else if (response.status === 400) {
        paymentHandler(res, orderId, "failed");
      }
    } catch (err) {
      toasts.error(err);
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

      rzpay.on("payment.error", function (resp) { });
      rzpay.open();
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    [Razorpay]
  );
  const handleSubmit = async (values) => {
const cleanedPhoneNumber = values.whatsapp.replace('+', '');
    let payload = {
      userId: userId,
      qty: state.quantity,
      amount: state.selectedProduct.price,
      productId: state.selectedProduct.id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.emailId,
      phone: cleanedPhoneNumber,
      size: state.selectedProduct.size.toUpperCase(),
      addressDetail: {
        billing: {
          address: values.address,
          city: values.city,
          pincode: values.pincode,
          state: values.state,
          country: "India",
        },
        shipping: {
          address: values.address,
          city: values.city,
          pincode: values.pincode,
          state: values.state,
          country: "India",
        },
      },
    };

    try {
      const response = await apiCallPost("/api/v1/satyug/orders", payload);
      if (response.status === 200) {
        handlePayment(response?.data?.orderId);
      }
    } catch (err) { }
  };

  const checkPinCode = async (value, pinCodeErrorFunc, formik) => {
    if (validatePincode(value, pinCodeErrorFunc)) {
     
      try {
        const response = await axios(
          `https://api.postalpincode.in/pincode/${value}`
        );
        if (response.data[0].Status === "Success") {
          pinCodeErrorFunc({ error: undefined, message: "Pincode Available" });
          formik.setFieldValue("state", response.data?.[0]?.PostOffice?.[0]?.State);        
        } else {       
          pinCodeErrorFunc({
            error: true,
            message: "Please enter valid Pincode",
          });
        }
      } catch (error) {
        pinCodeErrorFunc({
          error: true,
          message: "Please enter valid Pincode",
        });
      }
    }
  };
  const pincodeValidation = () => {
    const { error, message } = pinCodeError;

    if (error) return message;

  };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debouncing(checkPinCode), 
      // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return (
    <section className={styles.checkout}>
      <Container>
        <PageHeading heading="CheckOut" className={styles.heading} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <Row>
                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="First Name :"
                      placeholder="First Name "
                      name="firstName"
                    />
                  </Col>
                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="Last Name :"
                      placeholder="Last Name"
                      name="lastName"
                    />
                  </Col>
                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="Email ID :"
                      placeholder="Email ID"
                      name="emailId"
                    />
                  </Col>
                  <Col sm={6}>
                    {/* <Input
                      className={styles.input}
                      formik={formik}
                      label="Contact Number :"
                      placeholder="Contact Number"
                      name="contact"
                    /> */}
                    <PhoneInput
                  id="contact"
                  international
                  control="input"
                  className={styles.input}
                  name="contact"
                  label="Contact Number :"
                  formik={formik}
                  defaultCountry = "IN"
                  onChange={(value) => {
                    formik.setFieldValue("contact", value);
                  }}
                  />
                  </Col>

                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="Pincode :"
                      validate={pincodeValidation}
                      onChange={(e) => {
                        formik.setFieldValue("pincode", e.target.value);
                        optimizedFn(
                          e.target.value,
                          setPinCodeError,
                          formik
                        );
                      }}
                      placeholder="Pincode"
                      name="pincode"
                      type="number"
                    />
                  </Col>
                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="Address Shipping :"
                      placeholder="Address Shipping"
                      name="address"
                    />
                  </Col>
                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="State/UT :"
                      placeholder="State / UT"

                      disabled
                      name="state"
                    />
                  </Col>
                  <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="City :"
                      placeholder="City"
                      name="city"
                    />
                  </Col>
                  {/* <Col sm={6}>
                    <Input
                      className={styles.input}
                      formik={formik}
                      label="Billing Address :"
                      placeholder="Billing Address"
                      name="billingAddress"
                    />
                  </Col> */}
                </Row>
                <div className={styles.checkout_action}>
                  <button
                    className={styles.back_btn}
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    <img src={`${S3_BUCKET.IMAGES}/back-icon.png`} alt="back" />
                    Back to product detail
                  </button>
                  <Button
                    className={styles.submit_btn}
                    type="submit"
                    text="Proceed"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
      {/* <SuccessModal
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        email={email}
      /> */}
    </section>
  );
};

export default Checkout;
