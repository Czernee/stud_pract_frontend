import React, { useState } from 'react'
import Button from '../Button/Button'
import './ProductItem.css'

const ProductItem = ({product, className, onAdd}) => {
    let [isActive, setIsActive] = useState(false);

    const onAddHandler = () => {
        onAdd(product)
        setIsActive(isActive = !isActive);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}><img src={"./img/" + product.img} alt=""/></div>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button onClick={onAddHandler} className={`add-btn ${isActive && 'active'}`}>
                {isActive ? "Убрать" : "В корзину"}
            </Button>
        </div>
    )
}

export default ProductItem