import { useState } from "react";
import CouponCard from "../CouponCard/CouponCard";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import SendMail from "../SendMail/SendMail";
const Modal = ({
  setIsOpen,
  voucherCode,
  voucherAmount,
  lang,
  getTranslations,
}) => {
  const [showSendMail, setShowMail] = useState(false);
  const handleConfirm = () => {
    let confirmed = window.confirm(getTranslations(lang,'youSureWannaClose'));
    if (confirmed) {
      setIsOpen(true);
    }
  };
  return (
    <div className="Container">
      <div className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>
              {getTranslations(lang, "hereIsYourCode")}
            </h5>
          </div>
          <button className={styles.closeBtn} onClick={handleConfirm}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            {getTranslations(lang, "keepItSafe")}
          </div>
          <CouponCard voucherAmount={voucherAmount} voucherCode={voucherCode} />
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={handleConfirm}>
                {getTranslations(lang,"okDone")}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowMail(!showSendMail)}
              >
                {getTranslations(lang,"sendMail")}
              </button>
            </div>
          </div>
          {showSendMail && <SendMail lang={lang} getTranslations={getTranslations}/>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
