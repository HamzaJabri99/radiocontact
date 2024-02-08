import { useState } from "react";
import CouponCard from "../CouponCard/CouponCard";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import SendMail from "../SendMail/SendMail";
const Modal = ({ setIsOpen, voucherCode, voucherAmount,lang,getTranslations }) => {
  const [showSendMail, setShowMail] = useState(false);
  return (
    <div className="Container">
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              {getTranslations(lang,'hereIsYourCode')}
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {getTranslations(lang,'keepItSafe')}
          </div>
          <CouponCard voucherAmount={voucherAmount} voucherCode={voucherCode} />
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
                onClick={() => setShowMail(!showSendMail)}
              >
                Send Mail?
              </button>
            </div>
          </div>
          {showSendMail && <SendMail />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
