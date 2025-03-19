import { useEffect, useState } from "react";
import classes from "./cartPage.module.scss";

import Header from "../header/header";
import Footer from "../footer/footer";
import CartItem from "./cartItem/cartItem";

import arrowRight from "./img/arrow_right.png";
import smile from "./img/smile.png";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const discount = 8.01;

  useEffect(() => {
    document.title = "Корзина";
    fetchCartItems();
  }, []);

  async function fetchCartItems() {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const data = await response.json();
      console.log("Данные корзины:", data); // Отладочный вывод
      setCartItems(data);
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  }

  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  function handleAmountChange(itemId, newAmount) {
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, amount: newAmount } : item
    );
    setCartItems(updatedItems);
  }

  function calculateTotal(items) {
    const totalSum = items.reduce((sum, item) => {
      const price = item.cardprice || 0; // Исправлено имя свойства
      const amount = item.amount || 0;
      const discount = item.discount || 0;
      return sum + price * amount * (1 - discount / 100);
    }, 0);
    setTotal(totalSum);
  }

  return (
    <>
      <Header />
      <main className={classes.main}>
        <section className={classes.section}>
          <div className={classes.top}>
            <a href="/">Главная</a>
            <img src={arrowRight} alt="" />
            <a href="/catalog">Корзина</a>
          </div>
          <div className={classes.bot}>
            <div className={classes.title}>
              <p>Корзина</p>
              <div>
                <p>{cartItems.length}</p>
              </div>
            </div>
            <div className={classes.general}>
              <div className={classes.items}>
                <div className={classes.list}>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      isSelected={false}
                      onSale={item.discount > 0}
                      image={item.image}
                      cardPrice={item.cardprice} // Исправлено имя свойства
                      regularPrice={item.regularprice}
                      name={item.name}
                      discount={item.discount}
                      amount={item.amount}
                      onAmountChange={(newAmount) => handleAmountChange(item.id, newAmount)}
                    />
                  ))}
                </div>
              </div>
              <div className={classes.payment}>
                <div className={classes.price_math}>
                  <div>
                    <p>{cartItems.length} товаров</p>
                    <p>{total.toFixed(2)} ₽</p>
                  </div>
                  <div>
                    <p>Скидка</p>
                    <p>-{discount} ₽</p>
                  </div>
                </div>
                <div className={classes.total}>
                  <div className={classes.total_price}>
                    <p>Итог</p>
                    <p>{isNaN(total - discount) ? "Ошибка" : (total - discount).toFixed(2)} ₽</p>
                  </div>
                  <div className={classes.bonuses}>
                    <img src={smile} alt="" />
                    <p>Вы получаете <span>100 бонусов</span></p>
                  </div>
                </div>
                <div className={classes.submit}>
                  <button type="submit">Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}