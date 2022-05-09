import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';

const modalRoot = document.querySelector('#modals');

const Modal = ({ children, title, onClose }) => {

    return ReactDOM.createPortal((
        <>
            <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}>
                <div className={modalStyles.title}>
                    <h2 className='text text_type_main-large'>{title}</h2>
                    <CloseIcon type='primary' onClick={onClose} />
                </div>
                {children}
            </div>
        </>
    ), modalRoot);
};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;