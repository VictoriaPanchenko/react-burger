import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClick}>
    </div>
  )
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ModalOverlay;