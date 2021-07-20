import Modal from "react-modal";
import React from "react";
import Constants from "../Utils/Constants";

export default function CustomModal({ title, content, isVisible, onClose }) {
  return (
    isVisible && (
      <Modal
        style={Constants.defaultModalStyle}
        isOpen={isVisible}
        onRequestClose={onClose ? () => onClose() : null}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            {onClose && (
              <a href="#" className="close" onClick={() => onClose()}>
                <em className="icon ni ni-cross" />
              </a>
            )}
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer theme-bg py-0" style={{height: "4px"}}></div>
        </div>
      </Modal>
    )
  );
}
