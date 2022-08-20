import ReactDOM from 'react-dom';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface IModal extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    onClose: () => void;
    title?: string;
    children?: ReactNode;
  }  

const modalRoot = document.querySelector('#modals');

const Modal:FC<IModal> = ({ children, title, onClose }) => {

    useEffect(() => {
        // add when mounting
        document.addEventListener('keydown', onEscPress);

        //remove when unmounting
        return (() => document.removeEventListener('keydown', onEscPress));
    }, []);

    const onEscPress = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape')
            onClose();
    }


    return ReactDOM.createPortal((
        <>
            <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`} >
                <div className={modalStyles.title}>
                    <h2 className='text text_type_main-large'>{title}</h2>
                    <span className={modalStyles.closeIcon}>
                        <CloseIcon type='primary' onClick={onClose} />
                    </span>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>
    ), modalRoot!);
};

export default Modal;