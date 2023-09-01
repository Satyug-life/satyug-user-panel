import React, { useState, useEffect } from 'react'; // Import useEffect
import styles from "./SelectAsset.module.scss";
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCallGet } from '../../../axiosApi/Axios';
import { S3_BUCKET } from '../../../utils/Constants';
import SuccessModal from '../../common/Modals/SuccessModal/SuccessModal';
import { useSelector } from 'react-redux';

const SelectAsset = () => {
  const location = useLocation();
  const email = useSelector((state) => state.userDetails.email);
  const [showModal, setShowModal] = useState(false);
  const { success } = location?.state || {};

  useEffect(() => {
    if (success) {
      setShowModal(true);
    }
  }, [success]);
  

  const handleCloseModal = () => {
    window.history.replaceState({}, document.success)
    setShowModal(false);
  };

  

  const getProductDetails = async (assetName) => {
    try {
      let response = await apiCallGet(
        `/api/v1/satyug/product/${assetName}/10/1`,
        {},
        true,
        true
      );

      if (response.status === 200) {
        navigate('/view-asset', {
          state: {
            productDetails: response,
            isProduct: true
          }
        });      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <section className={styles.select_asset}>
      <Container>
        <h2>Select type of asset you want to receive </h2>
        <Row>
          <Col xs={6}>
            <div onClick={() => getProductDetails('t-shirt')} className={`${styles.asset_box}`}>
              <div className={styles.asset_box_inner}>
                <div className={styles.asset_img}>
                  <img src={S3_BUCKET.SHIRT} alt="shirt" />
                </div>
                <span className={styles.left_arrow}><img src={`${S3_BUCKET.IMAGES}/game-left-arrow.png`} alt="left-arrow" /></span>
                <span className={styles.right_arrow}><img src={`${S3_BUCKET.IMAGES}/game-right-arrow.png`} alt="right-arrow" /></span>
              </div>
              <h3>T-SHIRT</h3>
            </div>
          </Col>
          <Col xs={6}>
            <div onClick={() => getProductDetails('Cap')} className={`${styles.asset_box}`}>
              <div className={styles.asset_box_inner}>
                <div className={styles.asset_img}>
                  <img src={S3_BUCKET.CAP} alt="cap" />
                </div>
                <span className={styles.left_arrow}><img src={`${S3_BUCKET.IMAGES}/game-left-arrow.png`} alt="left-arrow" /></span>
                <span className={styles.right_arrow}><img src={`${S3_BUCKET.IMAGES}/game-right-arrow.png`} alt="right-arrow" /></span>
              </div>
              <h3>Cap</h3>
            </div>
          </Col>
        </Row>
      </Container>
      <SuccessModal
        show={showModal}
        handleClose={() => {
          handleCloseModal();
        }}
        email={email}
      />
    </section>
  )
}

export default SelectAsset;
