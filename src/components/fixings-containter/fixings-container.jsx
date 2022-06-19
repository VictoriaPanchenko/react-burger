import React, { useRef } from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import fixingsStyles from './fixings-container.module.css';
import { changeOrder } from "../../services/actions/constructor";
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import ingredientItemPropType from '../../utils/custom-prop-types';

const FixingsContainer = ({ item, index, handleDelete }) => {

    const ref = useRef(null);
    const id = item.uId;
    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: 'fixing',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch(changeOrder(dragIndex, hoverIndex));
            item.index = hoverIndex;
        },
    });


    const [{ isDragging }, drag] = useDrag({
        type: 'fixing',
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

        <li ref={ref}
            data-handler-id={handlerId} style={{ opacity }} className={`${fixingsStyles.listElement} mb-4`}>
            <span className={fixingsStyles.dragIcon}>
                <DragIcon type="primary" />
            </span>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => { handleDelete(item) }}
            />
        </li>

    );
}

FixingsContainer.propTypes = {
    item: ingredientItemPropType.isRequired,
    index: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default FixingsContainer