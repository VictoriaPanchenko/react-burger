import React, { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlay
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  onClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
  return <div className={modalOverlayStyles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
