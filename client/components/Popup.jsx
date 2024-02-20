/* eslint-disable react/prop-types */

import './Popup.css'
const PopupComponent = ({ showPopup, onClose, message }) => {
  return (
    <div className={`popup ${showPopup ? 'active' : ''}`}>
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupComponent;
