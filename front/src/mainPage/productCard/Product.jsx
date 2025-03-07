import React, { useState } from "react";
import classes from "./productCard.module.scss";

import noHeart from "../img/heart.png";
import Heart from "../img/heartActive.png";

export default function Product({ name, price, image_url, onSale = false }) {
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <div className={classes.card}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${image_url})` }}
      >
        <div
          className={isFavorite ? `${classes.favorite} ${classes.active}` : classes.favorite}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <button type="button">
            <img
              src={isFavorite ? Heart : noHeart}
              style={{ opacity: isFavorite ? 1 : 0.5 }}
              alt="favorite"
              className={isFavorite ? classes.active : ""}
            />
          </button>
        </div>
      </div>
      <div className={classes.price}>
        <div className={classes.with_card}>
          <p>{price}₽</p>
          {onSale && <p>С картой</p>}
        </div>
        {onSale && (
          <div className={classes.regular}>
            <p>₽</p>
            <p>Обычная</p>
          </div>
        )}
      </div>
      <div className={classes.name}>
        <p>{name}</p>
      </div>
      <div className={classes.cart}>
        <button type="button">
          <p>В корзину</p>
        </button>
      </div>
    </div>
  );
}
