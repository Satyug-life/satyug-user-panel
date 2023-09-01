import React, { useEffect, useState } from "react";
import styles from "./ViewAsset.module.scss";
import { Container } from "react-bootstrap";
import Button from "../../common/Buttons/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toasts } from "../../common/Toast/Toast";
import PageHeading from '../../common/PageHeading/PageHeading';
import { DownArrow, UpArrow } from '../../../assets/svg/svgicons';
import { S3_BUCKET } from "../../../utils/Constants";

const flatten = (arr) => arr.reduce((acc, val) => acc.concat(val), []);
const ViewAsset = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { productDetails } = location?.state || {};
  const [qty, setQty] = useState(1);
  const sizesArrays = productDetails?.data?.rows.map((row) => row?.size) || [];

  const sizes = flatten(sizesArrays);
  const uniqueSizes = [...new Set(sizes)];
  const [selectedSize, setSelectedSize] = useState(uniqueSizes[0]);


  const selectedProduct =
    productDetails?.data?.rows.find((row) => row.size === selectedSize) || {};
  const [totalPrice, setTotalPrice] = useState(selectedProduct?.price || 0);
  const handleSizeChange = (size) => {

    setSelectedSize(size);

  };
  const handleQtyChange = (newQty) => {

    if (newQty > selectedProduct.quantity) {
      setQty(selectedProduct.quantity);
    } else if (newQty < 1) {
      setQty(1);
    } else {
      setQty(newQty);
    }
  };
  const updateTotalPrice = (newQty) => {
    const newTotalPrice = selectedProduct?.price * newQty;
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    setQty(1);
    setTotalPrice(selectedProduct?.price)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize]);

  useEffect(() => {
    updateTotalPrice(qty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty]);

  const makeOrder = async () => {
    if (qty > selectedProduct.quantity) {
      toasts.error(`Only ${selectedProduct.quantity} quantity is available for the selected product`)
    } else {
      navigate("/checkout", {
        state: {
          quantity: qty,
          selectedProduct: selectedProduct,
          isProduct : true
        },
      });
    }

  };
  return (
    <section className={styles.view_asset}>
      <Container>
        <div className={styles.view_asset_inner}>
          <div className={styles.asset_left}>
            <div className={styles.asset_box}>
              <div className={styles.asset_box_inner}>
                <img
                  className={styles.asset_img}
                  src={selectedProduct?.image}
                  alt="asset"
                />
                <span className={styles.left_arrow}>
                  <img src={`${S3_BUCKET.IMAGES}/game-left-arrow.png`} alt="left-arrow" />
                </span>
                <span className={styles.right_arrow}>
                  <img src={`${S3_BUCKET.IMAGES}/game-right-arrow.png`} alt="right-arrow" />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.asset_right}>
            <PageHeading heading={<h3>{selectedProduct?.title}</h3>} />
            <p>{selectedProduct?.description}</p>
            {productDetails?.data?.rows[0]?.type === "cap" ? (
              ""
            ) : (
              <div className={styles.size}>
                <h4>Size</h4>
                <ul>
                  {uniqueSizes.map((size, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSizeChange(size)}
                        className={selectedSize === size && styles.active}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className={styles.qty}>
              <div className={styles.qty_inner}>
                <input
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  value={qty}
                  pattern="[0-9]"
                  onChange={(e) => handleQtyChange(Math.trunc(e.target.value))}
                  type="number"
                  min={1}
                  max={+selectedProduct.quantity}
                />
                <div>
                  <button onClick={() => handleQtyChange(+qty + 1)}>
                    <UpArrow />
                  </button>
                  <button onClick={() => handleQtyChange(+qty - 1)}>
                    <DownArrow />
                  </button>
                </div>
              </div>
              <div className={styles.price}>
                <h4>Price:</h4>
                <h5>₹ {totalPrice}</h5>
              </div>
            </div>
            <Button
              // text="Submit"
              text="Proceed"
              disabled={qty === 0}
              className={styles.submit_btn}
              onClick={makeOrder}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ViewAsset;
