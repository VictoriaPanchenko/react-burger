import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({ children, onClick }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClick}>
      {children}
    </div>
  )
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalOverlay;