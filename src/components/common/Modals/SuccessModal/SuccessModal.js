import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from "./SuccessModal.module.scss";
import { CrossIcon, TickIcon } from '../../../../assets/svg/svgicons';


const SuccessModal = ({ show, email, handleClose }) => {
    return (
        <Modal
            show={show}
            className={styles.success_modal}
            onHide={handleClose}
            backdrop={"static"}
        >
            <Modal.Header>
                <Modal.Title><TickIcon /> Successfully Purchased!</Modal.Title>
                <button onClick={handleClose} className={styles.close_btn}>
                    <CrossIcon />
                </button>
            </Modal.Header>
            <Modal.Body>
                <p>
                    You order have been placed successfully.
                </p>
                <p>
                    Details have been sent on email id <span>{email}</span>
                </p>
            </Modal.Body>
        </Modal>
    )
}

export default SuccessModal
