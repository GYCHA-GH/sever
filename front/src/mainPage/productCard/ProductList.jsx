import React from "react";
import Product from "./Product";
import classes from "../mainPage.module.scss";

export default function ProductList({ products }) {
  return (
    <div className={classes.bot}>
      {products.length ? (
        products.map((product) => <Product key={product.id} {...product}/>)
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}