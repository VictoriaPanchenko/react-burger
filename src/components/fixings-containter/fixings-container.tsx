import React, { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import fixingsStyles from "./fixings-container.module.css";
import { changeOrder } from "../../services/actions/constructor";
import { useDrop, useDrag } from "react-dnd";
import { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { IIngredient } from "../../services/types";

interface IFixingsContainer
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  item: IIngredient;
  index: number;
  handleDelete: (item: IIngredient) => void;
}

const FixingsContainer: FC<IFixingsContainer> = ({
  item,
  index,
  handleDelete,
}) => {
  const ref = useRef(null);
  const id = item.uId;
  const dispatch = useAppDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: "fixing",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch(changeOrder(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "fixing",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      className={`${fixingsStyles.listElement} mb-4`}
    >
      <span className={fixingsStyles.dragIcon}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => {
          handleDelete(item);
        }}
      />
    </li>
  );
};

export default FixingsContainer;
