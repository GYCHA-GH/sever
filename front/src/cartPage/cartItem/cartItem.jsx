import React, { useEffect, useState } from "react";
import classes from "../cartPage.module.scss";

import minus from "../img/dec.png";
import plus from "../img/inc.png";
import check from "../img/check.png";

export default function CartItem({ 
  isSelected, 
  onSale, 
  image, 
  name, 
  cardPrice, 
  regularPrice, 
  discount, 
  amount, 
  onAmountChange 
}) {
  const [itemSelected, setItemSelected] = useState(false);
  const [getAmount, setAmount] = useState(Number(amount));
  const [getPrice, setPrice] = useState(
    ((cardPrice * getAmount) - ((cardPrice * getAmount) * discount / 100)).toFixed(2)
  );

  useEffect(() => {
    const updatedPrice = (cardPrice * getAmount) - ((cardPrice * getAmount) * discount / 100);
    setPrice(updatedPrice.toFixed(2));
    onAmountChange(getAmount); // Сообщаем родителю о смене количества
  }, [getAmount]);

  function IncreaseAmount() {
    if (getAmount < 99) {
      setAmount(prev => prev + 1);
    }
  }

  function DecreaseAmount() {
    if (getAmount > 1) {
      setAmount(prev => prev - 1);
    }
  }

  function toggleSelection() {
    setItemSelected(prev => !prev);
  }

  return (
    <div className={classes.cart_item} style={{ height: onSale ? "90px" : "72px" }}>
      <div className={classes.info}>
        <div className={classes.image}>
          <div onClick={toggleSelection} className={itemSelected ? `${classes.selector} ${classes.active}` : classes.selector}>
            {itemSelected && <img src={check} alt="Выбрано" />}
          </div>
          <div className={classes.item_image}>
            <img src={image} alt="" />
          </div>
        </div>
        <div className={classes.text}>
          <p>{name}</p>
          <div className={classes.prices} style={onSale ? null : { width: "87px" }}>
            <div className={classes.card_price}>
              <p>{cardPrice} ₽</p>
              <p style={onSale ? null : { display: "none" }}>С картой</p>
            </div>
            <div className={classes.regular_price} style={onSale ? null : { display: "none" }}>
              <p>{regularPrice} ₽</p>
              <p>Обычная</p>
            </div>
            <div className={classes.discount} style={onSale ? null : { display: "none" }}>
              <p>-{discount}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.price_and_amount}>
        <div className={classes.amount}>
          <div>
            <button type="button" onClick={DecreaseAmount}>
              <img src={minus} alt="Уменьшить" />
            </button>
            <p>{getAmount}</p>
            <button type="button" onClick={IncreaseAmount}>
              <img src={plus} alt="Увеличить" />
            </button>
          </div>
        </div>
        <div className={classes.price}>
          <p>{getPrice} ₽</p>
        </div>
      </div>
    </div>
  );
}
