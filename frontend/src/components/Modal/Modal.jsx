import CouponCard from "../CouponCard/CouponCard";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
const Modal = ({ setIsOpen, voucherCode }) => {
  return (
    <div className="Container">
      <div className={styles.darkBG}  />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              Congratulations! Voici ton Coupon Code
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Enregistrez-le bien, sinon vous ne pourrez plus l'obtenir :D
          </div>
          <CouponCard voucherCode={voucherCode} />
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => setIsOpen(false)}
              >
                Ok Done
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
