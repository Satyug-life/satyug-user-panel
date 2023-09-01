import React from "react";
import { Modal } from "react-bootstrap";
import { CrossIcon } from "../../../../assets/svg/svgicons";
import styles from "./SiteDescription.module.scss";
import Button from "../../Buttons/Button/Button";
const SiteDescription = ({ show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        className={styles.site_desciption}
        onHide={handleClose}
        centered
      >
        <Modal.Header>
          <h3>Description</h3>
          <button onClick={handleClose} className={styles.close_btn}>
            <CrossIcon />
          </button>
        </Modal.Header>
        <Modal.Body>
          <p>
            Satyug is an interactive Mini-Game App to connect a billion users to their roots, tradition, and culture, using the power of Religious Storytelling and Virtual Metaverse Darshans.</p>
          <Button
            onClick={handleClose}
            text="Ok"
            className="d-block mx-auto mt-4"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SiteDescription;
