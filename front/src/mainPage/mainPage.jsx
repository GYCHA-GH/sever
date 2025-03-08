import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import classes from "./mainPage.module.scss";
import img from "./img/img.png";
import right_arrow from "./img/right_arrow.png";
import { useEffect, useState } from 'react';
import ArticleCard from "./articleCard/articleCard";

import Card from "./productCard/Card";

export default function MainPage() {
  const [activeMap, setActiveMap] = React.useState(1);
  const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/articles")
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error("Ошибка загрузки:", error));
    }, []);

  return (
    <>
      <Header />

      <section className={classes.sect_one}>
        <div className={classes.con}>
          <div className={classes.image}>
            <img src={img} alt="Доставка" />
          </div>
          <div className={classes.text}>
            <p>Доставка бесплатно от 1000 ₽</p>
          </div>
        </div>
      </section>

      <main className={classes.main}>
        {/* Акции */}
        <section className={classes.sect_two}>
          <div className={classes.top}>
            <div className={classes.title}>
              <p>Акции</p>
            </div>
            <div className={classes.link}>
              <a href="/">
                <p>Все акции</p>
                <img src={right_arrow} alt="Стрелка" />
              </a>
            </div>
          </div>
          <div className={classes.bot_stocks}>
            <Card id={1}/>
            <Card id={2}/>
            <Card id={3}/>
            <Card id={4}/>
          </div>
        </section>

        {/* Новинки */}
        <section className={classes.sect_two}>
          <div className={classes.top}>
            <div className={classes.title}>
              <p>Новинки</p>
            </div>
            <div className={classes.link}>
              <a href="/">
                <p>Все новинки</p>
                <img src={right_arrow} alt="Стрелка" />
              </a>
            </div>
          </div>
          <div className={classes.bot_novelty}>
            <Card id={5}/>
            <Card id={6}/>
            <Card id={7}/>
            <Card id={8}/>
          </div>
        </section>

        {/* Покупали раньше */}
        <section className={classes.sect_two}>
          <div className={classes.top}>
            <div className={classes.title}>
              <p>Покупали раньше</p>
            </div>
            <div className={classes.link}>
              <a href="/">
                <p>Все покупки</p>
                <img src={right_arrow} alt="Стрелка" />
              </a>
            </div>
          </div>
          <div className={classes.bot_earlier}>
            <Card id={9}/>
            <Card id={10}/>
            <Card id={11}/>
            <Card id={12}/>
          </div>
        </section>

        {/* Наши магазины */}
        <section className={classes.sect_three}>
          <div className={classes.title}>
            <p>Наши магазины</p>
          </div>
          <div className={classes.maps}>
            <div className={classes.choice}>
              {[{ id: 1, name: "п.Щельяюр" }, { id: 2, name: "д.Вертеп" }, { id: 3, name: "с.Краснобор" }, { id: 4, name: "д.Диюр" }].map(
                ({ id, name }) => (
                  <button
                    key={id}
                    type="button"
                    className={activeMap === id ? classes.active : ""}
                    onClick={() => setActiveMap(id)}
                  >
                    <p>{name}</p>
                  </button>
                )
              )}
            </div>
            <div className={classes.map}>
              
            </div>
            
          </div>
        </section>

        {/* Специальные предложения */}
        <section className={classes.sect_four}>
          <div className={classes.title}>
            <p>Специальные предложения</p>
          </div>
          <div className={classes.special}>
            <div className={classes.special_one}>
              <div className={classes.con}>
                <p>Оформите карту «Северяночка»</p>
                <p>И получайте бонусы при покупке в магазинах и на сайте</p>
              </div>
            </div>
            <div className={classes.special_two}>
              <div className={classes.con}>
                <p>Покупайте акционные товары</p>
                <p>И получайте вдвое больше бонусов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Статьи */}
        <section className={classes.sect_five}>
          <div className={classes.top}>
            <div className={classes.title}>
              <p>Статьи</p>
            </div>
            <div className={classes.link}>
              <a href="/">
                <p>Все статьи</p>
                <img src={right_arrow} alt="Стрелка" />
              </a>
            </div>
          </div>
          <div className={classes.bot}>
          {articles.length > 0 ? (
                    articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            image={article.img}
                            date={article.date}
                            title={article.title}
                            desc={article.desc}
                        />
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
