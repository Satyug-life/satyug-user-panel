import React from "react";
import styles from "./PortraitModal.module.scss";
import { Modal } from "react-bootstrap";
import { RotateMobile } from "../../../../assets/svg/svgicons";

const PortraitModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      className={styles.portrait_modal}
      onHide={handleClose}
      backdropClassName="portrait_modal_backdrop"
      centered
    >
      <Modal.Body>
        <span className={styles.mobile_icon}>
          <RotateMobile />
        </span>
        <p>
          For Better experience switch to landscape mode
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default PortraitModal;
