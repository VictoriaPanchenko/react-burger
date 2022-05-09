import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.querySelector('#modals');

const Modal = ({ children, title, onClose }) => {

    useEffect(() => {
        // add when mounting
        document.addEventListener('keydown', onEscPress);

        //remove when unmounting
        return(() => document.removeEventListener('keydown', onEscPress));
    }, []);

    const onEscPress = (evt) => {
        if (evt.key === 'Escape')
            onClose();
    } 

    return ReactDOM.createPortal((
        <ModalOverlay onClick={onClose}>
            <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}>
                <div className={modalStyles.title}>
                    <h2 className='text text_type_main-large'>{title}</h2>
                    <CloseIcon type='primary' onClick={onClose} />
                </div>
                {children}
            </div>
        </ModalOverlay>
    ), modalRoot);
};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default Modal;