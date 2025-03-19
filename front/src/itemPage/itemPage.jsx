import React, { useState, useEffect } from 'react';
import classes from './itemPage.module.scss';

import Header from '../header/header';
import Footer from '../footer/footer';

import arrowRight from './img/arrow_right.png';
import emptyStar from './img/empty_star.png';
import halfStar from './img/half_star.png';
import fullStar from './img/full_star.png';
import share from './img/share.png';
import heart from './img/heart.png';
import cart from './img/shopping-cart.png';
import smile from './img/smile.png';
import bell_off from './img/bell-off.png';
import info from './img/info.png';
import Minimaslo from './img/minimaslo.png';

import bigFullStar from './img/big-full-star.png';
import bigEmptyStar from './img/big-empty-star.png';

import ProductCard from '../product/productCard/productCard';
import { ProductInfo } from '../product/productInfo';
import Review from './review/review';


import Card from '../mainPage/productCard/Card';

export default function ItemPage() {
  // Храним в состоянии объект "maslo"
  const [maslo, setMaslo] = useState(null);

  // Если нужно также получать отзывы
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/maslo")
      .then((res) => res.json())
      .then((data) => {
        setMaslo(data[0]); // Берем первый элемент массива
      })
      .catch((err) => console.error("Ошибка загрузки:", err));

      

    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);


  if (!maslo) {
    return <p>Загрузка...</p>;
  }
  return (
    <>
      <Header/>
      <main className={classes.main}>
        <div className={classes.title_of_page}>
          <a href="/">Главная</a>
          <img src={arrowRight} alt="" />
          <a href="/catalog">Каталог</a>
          <img src={arrowRight} alt="" />
          <a href="/catalog/milk-cheese-eggs">Молоко, сыр, яйцо</a>
          <img src={arrowRight} alt="" />
          <a href="/catalog/milk-cheese-eggs/maslo-prostokvashino">
            Масло ПРОСТОКВАШИНО сливочное в/с 69% фольга без змж, Россия, 180 г
          </a>
        </div>

        <section className={classes.sect_one}>
          <div className={classes.name}>
            {/* Выводим название из БД */}
            <p>{maslo.maslo_name}</p>
          </div>

          <div className={classes.middle}>
            <div className={classes.id}>
              <p>арт. {maslo.art}</p>
            </div>

            <div className={classes.rating}>
              <div className={classes.stars}>
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
                <img src={fullStar} alt="" />
              </div>
              <div className={classes.text}>
                <p>3 отзыва</p>
              </div>
            </div>

            <div className={classes.share}>
              <img src={share} alt="" />
              <p>Поделиться</p>
            </div>

            <div className={classes.favorite}>
              <img src={heart} alt="" />
              <p>В избранное</p>
            </div>
          </div>

          <div className={classes.bottom}>
            <div className={classes.left}>
              <div className={classes.row_of_images}>
                <div>
                  <img src={maslo.image1} alt="" />
                </div>
                <div>
                  <img src={maslo.imade2} alt="" />
                  А Где Блять?
                </div>
                <div>
                  <img src={maslo.image3} alt="" />
                </div>
                <div>
                  <img src={maslo.image4} alt="" />
                </div>
                <div>
                  <img src={maslo.image5} alt="" />
                </div>
              </div>
              <div className={classes.main_image}>
                <img src={maslo.image6} alt="" />
                <p>-50%</p>
              </div>
            </div>

            <div className={classes.center}>
              <div className={classes.pricing}>
                <div className={classes.prices}>
                  <div className={classes.regular}>
                    <p>{maslo.regularprice} ₽</p>
                    <p>Обычная цена</p>
                  </div>
                  <div className={classes.card}>
                    <p>{maslo.cardprice} ₽</p>
                    <p>
                      С картой Северяночки <img src={info} alt="" />
                    </p>
                  </div>
                </div>
                <div className={classes.into_cart}>
                  <button type="button">
                    <img src={cart} alt="" />
                    <p>В корзину</p>
                  </button>
                </div>
                <div className={classes.bonuses}>
                  <img src={smile} alt="" />
                  <p>
                    Вы получаете <span>10 бонусов</span>
                  </p>
                </div>
                <div className={classes.notify}>
                  <img src={bell_off} alt="" />
                  <p>Уведомить о снижении цены</p>
                </div>
              </div>
              <div className={classes.info}>
                <div className={classes.line}>
                  <p>Бренд</p>
                  <p>{maslo.brend}</p>
                </div>
                <div className={classes.line}>
                  <p>Страна производителя</p>
                  <p>{maslo.strana}</p>
                </div>
                <div className={classes.line}>
                  <p>Упаковка</p>
                  <p>{maslo.ypakovka}</p>
                </div>
              </div>
            </div>

            <div className={classes.right}>
              <div className={classes.text}>
                <p>Похожие</p>
              </div>
              <div className={classes.simular_items}>
                <div className={classes.item}>
                  <div><img src={Minimaslo} alt="" /></div>
                  <p>157,50 ₽</p>
                </div>
                <div className={classes.item}>
                  <div><img src={Minimaslo} alt="" /></div>
                  <p>157,50 ₽</p>
                </div>
                <div className={classes.item}>
                  <div><img src={Minimaslo} alt="" /></div>
                  <p>157,50 ₽</p>
                </div>
                <div className={classes.item}>
                  <div><img src={Minimaslo} alt="" /></div>
                  <p>157,50 ₽</p>
                </div>
              </div>
            </div>
          </div>
        </section>
                <section className={classes.sect_two}>
                    <div className={classes.title}>
                        <p>С этим товаров покупают</p>
                    </div>
                    <div className={classes.line}>
                        <Card id={9}/>
                        <Card id={6}/>
                        <Card id={10}/>
                        <Card id={12}/>
                    </div>
                </section>
                <section className={classes.sect_three}>
                    <div className={classes.title}>
                        <p>Отзывы</p>
                    </div>
                    <div className={classes.review_sect}>
                        <div className={classes.rating}>
                            <div className={classes.top}>
                                <div className={classes.stars}>
                                    <img src={fullStar} alt="" />
                                    <img src={fullStar} alt="" />
                                    <img src={fullStar} alt="" />
                                    <img src={fullStar} alt="" />
                                    <img src={emptyStar} alt="" />
                                </div>
                                <div className={classes.number_outta_number}>
                                    <p>4 из 5</p>
                                </div>
                            </div>
                            <div className={classes.ratings}>
                                <div className={classes.stars}>
                                    <p>5</p>
                                    <div>
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                    </div>
                                    <p>1</p>
                                </div>
                                <div className={classes.stars}>
                                    <p>4</p>
                                    <div>
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                    </div>
                                    <p>1</p>
                                </div>
                                <div className={classes.stars}>
                                    <p>3</p>
                                    <div>
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                    </div>
                                    <p>0</p>
                                </div>
                                <div className={classes.stars}>
                                    <p>2</p>
                                    <div>
                                        <img src={fullStar} alt="" />
                                        <img src={fullStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                    </div>
                                    <p>0</p>
                                </div>
                                <div className={classes.stars}>
                                    <p>1</p>
                                    <div>
                                        <img src={fullStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                        <img src={emptyStar} alt="" />
                                    </div>
                                    <p>1</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.reviews}>
                        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Review
              key={review.id}
              pfp={review.pfp}
              name={review.name}
              star1={review.star1}
              star2={review.star2}
              star3={review.star3}
              star4={review.star4}
              star5={review.star5}
              date={review.date}
              text={review.text}
            />
          ))
        ) : (
          <p>Отзывов пока нет</p>
        )}
                        </div>
                    </div>
                    <form onSubmit={e => e.preventDefault()} className={classes.leave_review}>
                        <div className={classes.text_and_rating}>
                            <div className={classes.text}>
                                <p>Ваша оценка</p>
                            </div>
                            <div className={classes.rating}>
                                <img src={bigEmptyStar} alt="" />
                                <img src={bigEmptyStar} alt="" />
                                <img src={bigEmptyStar} alt="" />
                                <img src={bigEmptyStar} alt="" />
                                <img src={bigEmptyStar} alt="" />
                            </div>
                        </div>
                        <div className={classes.review_input}>
                            <textarea name="" id="" style={{resize: 'none'}} placeholder='Отзыв'></textarea>
                        </div>
                        <div className={classes.review_submit}>
                            <button type="submit">Отправить отзыв</button>
                        </div>
                    </form>
                </section>
                <section className={classes.sect_four}>
                    <div className={classes.top}>
                        <div className={classes.title}>
                            <p>Акции</p>
                        </div>
                        <div className={classes.link}>
                            <a href="">
                                <p>Все акции</p>
                                <img src={arrowRight} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className={classes.bot}>
                        <Card id={1}/>
                        <Card id={2}/>
                        <Card id={3}/>
                        <Card id={4}/>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}