import "./Modal.css";
import GreenCheck from "../../assets/green_check.svg";
import { useState } from "react";
import { useEffect } from "react";

const Modal = ({ isOpen, toggleModal, successData, setActiveItem }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 1300);
  }, [isOpen]);

  return (
    <div>
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        {isOpen && showContent && (
          <div className="modal_data">
            <div className="modal_header">
              <img src={GreenCheck} alt="" />
              <h1>{successData.title}</h1>
            </div>
            <div className="modal_content">
              <div className="modal_content_item">
                <p>{successData.field1}</p>
                <div className="modal_item_box">
                  {successData.data.source_account
                    ? successData.data.source_account
                    : successData.data.issuanceAddress}
                </div>
              </div>
              <div className="modal_content_item">
                <p>{successData.field2}</p>
                <div
                  className="modal_item_box"
                  style={{ color: " rgba(1, 87, 155, 1)", cursor: "pointer" }}
                  onClick={() => {
                    const url = `https://testnetexplorer.diamcircle.io/about-txHash/${
                      successData.data.hash
                        ? successData.data.hash
                        : successData.data.transactionHash
                    }`;
                    window.open(url, "_blank");
                  }}
                >
                  {`https://testnetexplorer.diamcircle.io/about-txHash/
                   ${
                     successData.data.hash
                       ? successData.data.hash
                       : successData.data.transactionHash
                   }`}
                </div>
              </div>
              <button
                onClick={() => setActiveItem(1)}
                style={{ cursor: "pointer" }}
              >
                Go to manage tokens
              </button>
            </div>
          </div>
        )}
        <div
          className={`exit-button ${isOpen ? "" : "hidden"}`}
          onClick={toggleModal}
        ></div>
      </div>
    </div>
  );
};

export default Modal;
