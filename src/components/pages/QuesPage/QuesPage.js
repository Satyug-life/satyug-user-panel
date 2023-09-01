import React, { useEffect, useState, useRef } from "react";
import styles from "./QuesPage.module.scss";
import { Container } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import Button from "../../common/Buttons/Button/Button";
import { apiCallPost } from "../../../axiosApi/Axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loader";
import { S3_BUCKET, S3_BUCKET_AUDIO } from "../../../utils/Constants";
import Loader from "../../common/Loader/Loader";

const QuesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showContent, setshowContent] = useState(false);
  const userId = useSelector((state) => state.userDetails.userId);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [message, setMessage] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
      audioRef?.current && audioRef.current.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef?.current]);

  const getQuiz = async () => {
    try {
      let response = await apiCallPost("/api/v1/satyug/users/questions");

      if (response.status === 200) {
        setQuiz(response?.data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setshowContent(true);
    }, 1500);
  }, []);
  useEffect(() => {
    setMessage(null);
    if (currentQuestionIndex >= 0 && currentQuestionIndex < quiz.length) {
      setCurrentQuestionIndex(currentQuestionIndex);
    }
  }, [currentQuestionIndex, quiz]);
  useEffect(() => {
    if (message === false) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const onSubmit = async (values, { resetForm }) => {
    const currentQuestion = quiz[currentQuestionIndex];
    const data = {
      question: currentQuestion.id,
      answer: values.answer?.toUpperCase(),
      userId: userId,
    };
    try {
      let response = await apiCallPost(
        "/api/v1/satyug/users/validate-quiz-answer",
        data,
        {}
      );

      if (response.status === 200) {
        setIsAnswerCorrect(true);
        setTimeout(() => {
          setIsAnswerCorrect(null);
          // setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          // resetForm();
          // if (currentQuestionIndex >= quiz.length - 1) {
          navigate("/question-right");
          // dispatch(setLoader(false));
          // }
        }, 2000);
      } else {
        setMessage(false);
        setTimeout(() => {
          navigate("/share");
          dispatch(setLoader(false));
        }, 1000);
      }
    } catch (error) {
      dispatch(setLoader(false));
      console.log(error);
      navigate("/share");
    }
  };

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={S3_BUCKET_AUDIO.QUIZ} type="audio/mpeg" />
      </audio>
      {!quiz || quiz.length === 0 ? (
        <Loader />
      ) : (
        <>
          <img
            src={`${S3_BUCKET.IMAGES}/question_page.jpg`}
            alt="shri-ram-ji"
            className={`${!showContent ? styles.show : ""} ${styles.mainImg}`}
          />

          <section
            className={`${styles.ques_page} ${showContent ? styles.show : ""}`}
          >
            <Container>
              <div className={styles.ques_page_inner}>
                <img
                  data-aos="zoom-in"
                  src={`${S3_BUCKET.IMAGES}/archery.png`}
                  className={styles.archery_icon}
                  alt="archery-icon"
                />
                <h1>
                  Jawab dijiye ek asan se sawal ka aur payiye mouka sunehri
                  trophy jitne ka
                </h1>
                <h2>{currentQuestion.question}</h2>
                <Formik
                  initialValues={{
                    answer: "",
                  }}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <ul>
                          {Object.entries(currentQuestion.options).map(
                            ([key, option]) => (
                              <li key={key}>
                                <label htmlFor={`radio_${key}`}>
                                  <Field
                                    type="radio"
                                    name="answer"
                                    value={key}
                                    id={`radio_${key}`}
                                  />
                                  <span className={styles.radio_btn} />
                                  <span>{option}</span>
                                </label>
                              </li>
                            )
                          )}
                        </ul>
                        <Button
                          className={styles.submit_action}
                          type="submit"
                          disabled={!formik.dirty}
                          text="Submit"
                        />
                      </Form>
                    );
                  }}
                </Formik>
                {isAnswerCorrect === true && (
                  <p className={styles.correct_answer}>Correct answer!</p>
                )}
                {message === false && (
                  <p className={styles.wrong_answer}>Wrong answer!</p>
                )}
              </div>
            </Container>
          </section>
        </>
      )}
    </>
  );
};

export default QuesPage;
