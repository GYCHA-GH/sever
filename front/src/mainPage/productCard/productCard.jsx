import classes from "./productCard.module.scss";
import noHeart from "../img/heart.png";
import Heart from "../img/heartActive.png";
import { useState } from "react";

export default function ProductCard({ id, onsale, regularprice, cardprice, img, name, stars, discount }) {
  const [isFavorite, setFavorite] = useState(false);

  return (
    <div className={classes.card} key={id}>
      <div className={classes.image} style={{ backgroundImage: `url("${img}")` }}>

        <div style={onsale ? {} : { visibility: "hidden" }} className={classes.discount}>
          <p>{discount}</p>
        </div>
        <div className={isFavorite ? `${classes.favorite} ${classes.active}` : `${classes.favorite}`}
             onClick={() => setFavorite(!isFavorite)}>
          <button type="button">
            <img src={isFavorite ? Heart : noHeart} style={isFavorite ? { opacity: 1 } : { opacity: 0.5 }} alt="" />
          </button>
        </div>
      </div>
      <div className={classes.price}>
        <div className={classes.with_card}>
          <p>{cardprice}₽</p>
          <p style={onsale ? {} : { display: "none" }}>С картой</p>
        </div>
        <div className={classes.regular} style={onsale ? {} : { display: "none" }}>
          <p>{regularprice} ₽</p>
          <p>Обычная</p>
        </div>
      </div>
      <div className={classes.name}>
        <a link={'/catalog/milk-cheese-eggs/maslo-prostokvashino'}>{name}</a>
        
      </div>
      <div className={classes.stars}>
        {stars.map((star, index) => (
          <img key={index} src={star} alt="Рейтинг" />
        ))}
      </div>
      <div className={classes.cart}>
        <button type="button">
          <p>В корзину</p>
        </button>
      </div>
    </div>
  );
}
