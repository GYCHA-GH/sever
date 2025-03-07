import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./productCard";

export default function Card({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных: {error.message}</p>;
  if (!product) return <p>Продукт не найден</p>;

  return (
    <ProductCard
      id={product.id}
      onsale={product.onsale}
      regularprice={product.regularprice}
      cardprice={product.cardprice}
      img={product.img}
      name={product.name}
      stars={[product.star1, product.star2, product.star3, product.star4, product.star5]}
      discount={product.discount}
    />
  );
}