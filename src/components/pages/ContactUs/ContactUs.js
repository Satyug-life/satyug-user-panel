import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import animation from "../../../assets/animations/fuljhadia.json";
import locationIcon from "../../../assets/images/location-icon.png";
import mailIcon from "../../../assets/images/mail-icon.png";
import phoneIcon from "../../../assets/images/phone-icon.png";
import { apiCallPost } from '../../../axiosApi/Axios';
import { FORMIK_REGEX, S3_BUCKET } from '../../../utils/Constants';
import SecondaryBtn from '../../common/Buttons/SecondaryBtn/SecondaryBtn';
import FormControl from '../../common/Formik/FormControl';
import HeadingText from '../../common/HeadingText/HeadingText';
import LottieAnimation from '../../common/LottieAnimation/LottieAnimation';
import { toasts } from '../../common/Toast/Toast';
import styles from "./ContactUs.module.scss";

const ContactUs = () => {
    const validationSchema = Yup.object({
        fname: Yup.string().matches(FORMIK_REGEX.ALPHA_REGEX, "Only alphabets are allowed.").required("First Name is Required").max(40, "First name must be between 2-40 characters.").min(2),
        lname: Yup.string().matches(FORMIK_REGEX.ALPHA_REGEX, "Only alphabets are allowed.").required("Last Name is Required").max(40, "Last name must be between 2-40 characters.").min(2),
        email: Yup.string().required("Email is Required").matches(FORMIK_REGEX.EMAIL_REGEX, "Email is invalid"),
        message: Yup.string().required("Message is Required").max(300, "Message must be between 2-300 characters.").min(10),
    })
    const initialValues = {
        fname: "",
        lname: "",
        email: "",
        message: "",
    };
    const handleSubmit = async (values, onSubmitProps) => {
        try {
            let response = await apiCallPost("/api/v1/satyug/contact-us", {
                "firstName": values.fname,
                "lastName": values.lname,
                "email": values.email,
                "message": values.message,
            })
            response.status === 200 && toasts.success(response.message)
            onSubmitProps.resetForm()
            onSubmitProps.setSubmitting(false);
        } catch (error) {

        }
    };
    return (
        <section className={styles.contact_us}>
            <Container>
                <img src={`${S3_BUCKET.IMAGES}/archery.png`} alt="archery-icon" className={styles.archery_icon} />
                <HeadingText
                    heading="Contact Us"
                    className={styles.heading}
                />
                <LottieAnimation
                    animation={animation}
                    className={styles.animation}
                />
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {
                        formik => {
                            return (
                                <Form>
                                    <Row>
                                        <Col sm={6}>
                                            <Row>
                                                <Col sm={12}>
                                                    <FormControl
                                                        className={styles.input}
                                                        name="fname"
                                                        formik={formik}
                                                        label="First Name :"
                                                    />
                                                </Col>
                                                <Col sm={12}>
                                                    <FormControl
                                                        className={styles.input}
                                                        name="lname"
                                                        formik={formik}
                                                        label="Last Name :"
                                                    />
                                                </Col>
                                                <Col sm={12}>
                                                    <FormControl
                                                        className={styles.input}
                                                        name="email"
                                                        formik={formik}
                                                        type="email"
                                                        label="Email Address :"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl
                                                className={styles.input}
                                                name="message"
                                                formik={formik}
                                                as="textarea"
                                                label="Message :"
                                            />
                                        </Col>
                                    </Row>
                                    <SecondaryBtn
                                        text="Submit"
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                    />
                                </Form>
                            )
                        }
                    }
                </Formik>
                <ul className={styles.social_details}>
                    <li>
                        <Link to="mailto:support@satyug.life">
                            <img src={mailIcon} alt="mail-icon" />support@satyug.life
                        </Link>
                    </li>
                    <li>
                        <Link to="tel:+919810187088" target="_blank" rel="noreferrer noopener">
                            <img src={phoneIcon} alt="phone-icon" />+919810187088
                        </Link>
                    </li>
                    <li>
                        <Link onClick={(e)=>{e.preventDefault()}}target="_blank" rel="noreferrer noopener">
                            <img src={locationIcon} alt="location-icon" /> D 193, Lajpat Nagar 1,
                            New Delhi- 110024</Link>
                    </li>
                </ul>
            </Container>
        </section>
    )
}

export default ContactUs
