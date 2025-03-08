import classes from './header.module.scss'
import { useEffect, useState } from 'react'

import logo from './img/logo.png'
import menu from './img/menu.png'
import search from './img/search.png'
import favorite from './img/favorite.png'
import favorite_active from './img/favorite_active.png'
import orders from './img/orders.png'
import orders_active from './img/orders_active.png'
import cart from './img/cart.png'
import cart_active from './img/cart_active.png'
import blankPFP from './img/profile_picture.png'
import downArrow from './img/down_arrow.png'
import Close from './img/close.png'
import arrowLeft from './img/arrow_left.png'

import RegistrationPopup from './RegistratonPopup'

export default function Header(){
    const [isUserLogged, setIsUserLogged] = useState(false);
    const [userName, setUserName] = useState('');
    const [catalogState, setCatalogState] = useState(false);
    const [loginPopUpState, setLoginPopUpState] = useState(false);

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [onWhatPage, setOnWhatPage] = useState('');

    useEffect(()=>{
        // Определяем текущую страницу
        if(document.URL.includes("favorite")){
            setOnWhatPage('favorite');
        }
        else if(document.URL.includes("orders")){
            setOnWhatPage('orders');
        }
        else if(document.URL.includes("cart")){
            setOnWhatPage('cart');
        }

        // Если хотим восстанавливать состояние пользователя при перезагрузке:
        const token = localStorage.getItem('token');
        if (token) {
            // Тут можно проверить валидность токена, запросить /api/me и т.д.
            // Для примера просто считаем, что если токен есть, пользователь залогинен:
            setIsUserLogged(true);
            // Можно хранить имя в localStorage или запрашивать с сервера
            // setUserName("Имя из localStorage или API");
        }
    }, []);

    // Колбэк, который срабатывает после успешной регистрации
    function handleRegisterSuccess(user) {
        setIsUserLogged(true);
        setUserName(user.name);
    }

    function OpenCatalog(){
        setCatalogState(true);
        let catalog = document.getElementById("catalogWindow");
        catalog.style.visibility = 'visible';
        catalog.style.opacity = 1;
        catalog.style.top = '72px';
    }
    function CloseCatalog(){
        setCatalogState(false);
        let catalog = document.getElementById("catalogWindow");
        catalog.style.visibility = 'hidden';
        catalog.style.opacity = 0;
        catalog.style.top = '0px';
    }
    
    function OpenLoginPopUp(){
        setLoginPopUpState(true);
        let popup = document.getElementById('loginPopUp');
        popup.style.visibility = 'visible';
        popup.style.opacity = 1;
    }
    function CloseLoginPopUp(){
        setLoginPopUpState(false);
        let popup = document.getElementById('loginPopUp');
        popup.style.visibility = 'hidden';
        popup.style.opacity = 0;
    }

    function SetBorderToInput(input){
        document.getElementById(input).style.border = '1px solid #70C05B';
    }
    function RemoveBorderFromInput(input){
        document.getElementById(input).style.border = '1px solid #BFBFBF';
    }

    return(
        <>
            <header>
                <nav>
                    <div className={classes.left}>
                        <div className={classes.logo}>
                            <a href="/"><img src={logo} alt="" /></a>
                        </div>
                        <div className={classes.catalog_search}>
                            <div className={classes.catalog} onClick={catalogState ? CloseCatalog : OpenCatalog}>
                                <img src={menu} alt="" />
                                <p>Каталог</p>
                            </div>
                            <form className={classes.search_bar}>
                                <input type="text" name="q" id="q" placeholder='Найти товар' />
                                <button type="submit"><img src={search} alt="" /></button>
                            </form>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.links}>
                            <a href='/favorite' className={classes.favorite}>
                                <img src={onWhatPage === 'favorite' ? favorite_active : favorite} alt="" />
                                <p className={onWhatPage === 'favorite' ? classes.active : null}>Избранное</p>
                            </a>
                            <a href='/orders' className={classes.orders}>
                                <img src={onWhatPage === 'orders' ? orders_active : orders} alt="" />
                                <p className={onWhatPage === 'orders' ? classes.active : null}>Заказы</p>
                            </a>
                            <a href='/cart' className={classes.cart}>
                                <img src={onWhatPage === 'cart' ? cart_active : cart} alt="" />
                                <p className={onWhatPage === 'cart' ? classes.active : null}>Корзина</p>
                            </a>
                        </div>
                        <div className={classes.account}>
                            <div className={classes.con}>
                                <div onClick={loginPopUpState ? CloseLoginPopUp : OpenLoginPopUp}>
                                    <img src={blankPFP} alt="" className={classes.pfp}/>
                                    <p>{isUserLogged ? userName : 'Войти'}</p>
                                </div>
                                <div>
                                    <img src={downArrow} alt="" className={classes.arrow}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Каталог */}
            <div className={classes.catalog_menu} id='catalogWindow'>
                <div className={classes.con}>
                    <div className={classes.links}>
                        <a href="/catalog/milk-cheese-eggs">Молоко, сыр, яйцо</a>
                        <a href="/catalog/bread">Хлеб</a>
                        <a href="/catalog/fruits-and-vegetables">Фрукты и овощи</a>
                        <a href="/catalog/frozen-food">Замороженные продукты</a>
                    </div>
                    <div className={classes.links}>
                        <a href="/catalog/drinks">Напитки</a>
                        <a href="/catalog/candy">Кондитерские изделия</a>
                        <a href="/catalog/tea-coffee">Чай, кофе</a>
                    </div>
                    <div className={classes.links}>
                        <a href="/catalog/grocery">Бакалея</a>
                        <a href="/catalog/healthy-food">Здоровое питание</a>
                        <a href="/catalog/for-pets">Зоотовары</a>
                    </div>
                    <div className={classes.links}>
                        <a href="/catalog/non-edible">Непродовольственные товары</a>
                        <a href="/catalog/for-babies">Детское питание</a>
                        <a href="/catalog/meat">Мясо, птица, колбаса</a>
                    </div>
                </div>
            </div>

            {/* Попап для логина */}
            <div className={classes.login_popup} id='loginPopUp'>
                <div className={classes.window}>
                    <div className={classes.close_window}>
                        <button type="button" onClick={loginPopUpState ? CloseLoginPopUp : OpenLoginPopUp}>
                            <img src={Close} alt="" />
                        </button>
                    </div>
                    <div className={classes.main}>
                        <div className={classes.title}>
                            <p>Вход</p>
                        </div>
                        <form onSubmit={e => e.preventDefault()} className={classes.inputs}>
                            <div className={classes.phone}>
                                <label htmlFor=""><p>Телефон</p></label>
                                <input type="tel" name="phone" id="phone" required 
                                  onBlur={() => RemoveBorderFromInput('phone')} 
                                  onFocus={() => SetBorderToInput('phone')}
                                />
                            </div>
                            <div className={classes.submit}>
                                <button type="submit"><p>Вход</p></button>
                            </div>
                        </form>
                        <div className={classes.other}>
                            <div className={classes.register}>
                                <button type="button" onClick={() => setIsRegisterOpen(true)}>Регистрация</button>
                            </div>
                            <div className={classes.return} style={{display: 'none'}}>
                                <img src={arrowLeft} alt="" />
                                <p>Вернуться</p>
                            </div>
                            <div className={classes.forgor}>
                                <p>Забыли пароль?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Попап для регистрации */}
            <RegistrationPopup
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onRegisterSuccess={handleRegisterSuccess}
            />
        </>
    )
}
