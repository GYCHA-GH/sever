import classes from './header.module.scss'
import { useEffect, useState } from 'react'

// Импорт ваших картинок:
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
import eye from './img/eye.png'
import eye_off from './img/eye-off.png'
import check from './img/check.png'

export default function Header() {
  // ---- Логика пользователя ----
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [userName, setUserName] = useState('')

  // При загрузке проверяем, нет ли сохранённого пользователя в localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setIsUserLogged(true)
      setUserName(parsed.name)
    }
  }, [])

  // ---- Логика каталога ----
  const [catalogState, setCatalogState] = useState(false)

  function OpenCatalog() {
    setCatalogState(true)
    let catalog = document.getElementById("catalogWindow")
    catalog.style.visibility = 'visible'
    catalog.style.opacity = 1
    catalog.style.top = '72px'
  }
  function CloseCatalog() {
    setCatalogState(false)
    let catalog = document.getElementById("catalogWindow")
    catalog.style.visibility = 'hidden'
    catalog.style.opacity = 0
    catalog.style.top = '0px'
  }

  // ---- Логика попапов (login, register) ----
  const [loginPopUpState, setLoginPopUpState] = useState(false)
  const [popupState, setPopupState] = useState(0)  // управляет "шагами" в логине/регистрации

  function OpenLoginPopUp() {
    setLoginPopUpState(true)
    let popup = document.getElementById('loginPopUp')
    popup.style.visibility = 'visible'
    popup.style.opacity = 1
  }
  function CloseLoginPopUp() {
    setLoginPopUpState(false)
    let popup = document.getElementById('loginPopUp')
    popup.style.visibility = 'hidden'
    popup.style.opacity = 0
    setPopupState(0)
  }

  // ---- Логика ввода телефона/пароля для входа ----
  const [loginPhone, setLoginPhone] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Первая форма (ввод телефона) -> переключаемся на ввод пароля
  function handlePhoneSubmit(e) {
    e.preventDefault()
    setPopupState(2)
  }

  // Вторая форма (ввод пароля) -> отправляем на сервер
  async function handlePasswordSubmit(e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone, password: loginPassword })
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.error || 'Ошибка при входе')
        return
      }

      // Если всё ок, запоминаем пользователя
      localStorage.setItem('user', JSON.stringify(data.user))
      setIsUserLogged(true)
      setUserName(data.user.name)

      // Закрываем попап
      setPopupState(0)
      CloseLoginPopUp()
    } catch (err) {
      console.error(err)
      alert('Сервер недоступен')
    }
  }

  // ---- Логика "Забыли пароль" (просто шаблон) ----
  function handleForgotPhoneSubmit(e) {
    e.preventDefault()
    setPopupState(4)
  }

  // ---- Логика "Новый пароль" (шаблон) ----
  function handleNewPasswordSubmit(e) {
    e.preventDefault()
    // здесь отправляете новый пароль на сервер
    // ...
    // закрываете попап
  }

  // ---- Логика регистрации ----
  // Сохраняем все поля из формы регистрации
  const [regPhone, setRegPhone] = useState('')
  const [regLastName, setRegLastName] = useState('')
  const [regFirstName, setRegFirstName] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regRepeatPassword, setRegRepeatPassword] = useState('')
  const [regBirthDate, setRegBirthDate] = useState('')
  const [regRegion, setRegRegion] = useState('')
  const [regCity, setRegCity] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regCardNumber, setRegCardNumber] = useState('')
  // есть ещё userGender, userHasCard

  async function handleRegisterSubmit(e) {
    e.preventDefault()
    // Проверим совпадение паролей
    if (regPassword !== regRepeatPassword) {
      alert('Пароли не совпадают!')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // подбирайте названия полей как на сервере
          phone: regPhone,
          name: regFirstName, // если нужно сохранять "name" = Имя
          surname: regLastName,
          password: regPassword,
          email: regEmail,
          region: regRegion,
          locality: regCity,
          card_number: regCardNumber,
          // и т.д.
        })
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.error || 'Ошибка при регистрации')
        return
      }
      // Допустим, сервер возвращает { user: { name, ... }, token, ... }
      // Если нужно авторизовать сразу:
      // localStorage.setItem('user', JSON.stringify(data.user))
      // setIsUserLogged(true)
      // setUserName(data.user.name)

      alert('Регистрация успешна!')
      setPopupState(0)
    } catch (err) {
      console.error(err)
      alert('Сервер недоступен')
    }
  }

  // ---- Доп. функции для border'ов полей ----
  function SetBorderToInput(input) {
    document.getElementById(input).style.border = '1px solid #70C05B'
  }
  function RemoveBorderFromInput(input) {
    document.getElementById(input).style.border = '1px solid #BFBFBF'
  }

  // ---- Логика отображения активной страницы ----
  const [onWhatPage, setOnWhatPage] = useState('')
  useEffect(() => {
    if (document.URL.includes("favorite")) {
      setOnWhatPage('favorite')
    } else if (document.URL.includes("orders")) {
      setOnWhatPage('orders')
    } else if (document.URL.includes("cart")) {
      setOnWhatPage('cart')
    }
  }, [])

  // ---- Логика показа/скрытия пароля ----
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [userHasCard, setUserHasCard] = useState(true)
  const [userGender, setUserGender] = useState(0)

  return (
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
                {/* При клике открываем окно логина (первый шаг) */}
                <div onClick={() => setPopupState(1)}>
                  <img src={blankPFP} alt="" className={classes.pfp} />
                  <p>{isUserLogged ? userName : 'Войти'}</p>
                </div>
                <div>
                  <img src={downArrow} alt="" className={classes.arrow} />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Меню каталога */}
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

      {/* Первая страница логина: Ввод телефона */}
      <div className={classes.login_popup} id='loginPopUp' style={popupState === 1 ? { display: "flex" } : { display: "none" }}>
        <div className={classes.window}>
          <div className={classes.close_window}>
            <button type="button" onClick={() => setPopupState(0)}>
              <img src={Close} alt="" />
            </button>
          </div>
          <div className={classes.phone_enter}>
            <div className={classes.title}>
              <p>Вход</p>
            </div>
            {/* При сабмите сохраняем телефон и переключаемся на шаг 2 */}
            <form onSubmit={handlePhoneSubmit} className={classes.inputs}>
              <div className={classes.phone}>
                <label htmlFor="">
                  <p>Телефон</p>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  onBlur={() => RemoveBorderFromInput('phone')}
                  onFocus={() => SetBorderToInput('phone')}
                />
              </div>
              <div className={classes.submit}>
                <button type="submit">
                  <p>Вход</p>
                </button>
              </div>
            </form>
            <div className={classes.other}>
              <div className={classes.register}>
                <button type="button" onClick={() => setPopupState(5)}>Регистрация</button>
              </div>
              <div className={classes.return} style={{ display: 'none' }}>
                <img src={arrowLeft} alt="" />
                <p>Вернуться</p>
              </div>
              <div className={classes.forgor}>
                <p onClick={() => setPopupState(3)}>Забыли пароль?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Вторая страница логина: Ввод пароля */}
      <div className={classes.login_popup} id='loginPopUp' style={popupState === 2 ? { display: "flex" } : { display: "none" }}>
        <div className={classes.window}>
          <div className={classes.close_window}>
            <button type="button" onClick={() => setPopupState(0)}>
              <img src={Close} alt="" />
            </button>
          </div>
          <div className={classes.phone_enter}>
            <div className={classes.title}>
              <p>Вход</p>
            </div>
            {/* При сабмите отправляем запрос на сервер */}
            <form onSubmit={handlePasswordSubmit} className={classes.inputs}>
              <div className={classes.phone}>
                <label htmlFor="">
                  <p>Пароль</p>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onBlur={() => RemoveBorderFromInput('password')}
                  onFocus={() => SetBorderToInput('password')}
                />
              </div>
              <div className={classes.submit}>
                <button type="submit">
                  <p>Подтвердить</p>
                </button>
              </div>
            </form>
            <div className={classes.other}>
              <div className={classes.register} style={{ display: 'none' }}>
                <button type="button">Регистрация</button>
              </div>
              <div className={classes.return} style={{ display: 'flex' }} onClick={() => setPopupState(1)}>
                <img src={arrowLeft} alt="" />
                <p>Вернуться</p>
              </div>
              <div className={classes.forgor}>
                <p onClick={() => setPopupState(3)}>Забыли пароль?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Третья страница логина: Забыли пароль */}
      <div className={classes.login_popup} id='loginPopUp' style={popupState === 3 ? { display: "flex" } : { display: "none" }}>
        <div className={classes.window}>
          <div className={classes.close_window}>
            <button type="button" onClick={() => setPopupState(0)}>
              <img src={Close} alt="" />
            </button>
          </div>
          <div className={classes.phone_enter}>
            <div className={classes.title}>
              <p>Забыли пароль?</p>
            </div>
            <form onSubmit={handleForgotPhoneSubmit} className={classes.inputs}>
              <div className={classes.phone}>
                <label htmlFor="">
                  <p>Телефон</p>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  onBlur={() => RemoveBorderFromInput('phone')}
                  onFocus={() => SetBorderToInput('phone')}
                />
              </div>
              <div className={classes.submit}>
                <button type="submit">
                  <p>Подтвердить</p>
                </button>
              </div>
            </form>
            <div className={classes.other}>
              <div style={{ display: 'none' }} className={classes.register}>
                <button type="button">Регистрация</button>
              </div>
              <div className={classes.return} style={{ display: 'flex' }} onClick={() => setPopupState(1)}>
                <img src={arrowLeft} alt="" />
                <p>Вернуться</p>
              </div>
              <div style={{ display: 'none' }} className={classes.forgor}>
                <p>Забыли пароль?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Четвёртая страница логина: Новый пароль */}
      <div className={classes.new_password_popup} id='loginPopUp' style={popupState === 4 ? { display: "flex" } : { display: "none" }}>
        <div className={classes.window}>
          <div className={classes.close_window}>
            <button type="button" onClick={() => setPopupState(0)}>
              <img src={Close} alt="" />
            </button>
          </div>
          <div className={classes.phone_enter}>
            <div className={classes.title}>
              <p>Новый пароль</p>
            </div>
            <form onSubmit={handleNewPasswordSubmit} className={classes.inputs}>
              <div className={classes.password}>
                <label htmlFor="password">Пароль</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                />
                <img
                  src={showPassword ? eye : eye_off}
                  alt=""
                  required
                  style={{ position: "absolute" }}
                  onClick={showPassword ? () => setShowPassword(false) : () => setShowPassword(true)}
                />
              </div>
              <div className={classes.repeat_password}>
                <label htmlFor="repeatPassword">Повторите пароль</label>
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  name="repeatPassword"
                  id="repeatPassword"
                />
                <img
                  src={showRepeatPassword ? eye : eye_off}
                  alt=""
                  required
                  style={{ position: "absolute" }}
                  onClick={showRepeatPassword ? () => setShowRepeatPassword(false) : () => setShowRepeatPassword(true)}
                />
              </div>
              <div className={classes.submit}>
                <button type="submit">
                  <p>Подтвердить</p>
                </button>
              </div>
            </form>
            <div className={classes.other}>
              <div className={classes.return} style={{ display: 'flex' }} onClick={() => [setPopupState(1), setShowRepeatPassword(false), setShowPassword(false)]}>
                <img src={arrowLeft} alt="" />
                <p>Вернуться</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Страница регистрации */}
      <div className={classes.register_popup} id='RegisterPopUp' style={popupState === 5 ? { display: "flex" } : { display: "none" }}>
        <div className={classes.window}>
          <div className={classes.close_window}>
            <button type="button" onClick={() => setPopupState(0)}>
              <img src={Close} alt="" />
            </button>
          </div>
          <form onSubmit={handleRegisterSubmit} className={classes.registration_form}>
            <div className={classes.title}>
              <p>Регистрация</p>
            </div>
            <div className={classes.required}>
              <div className={classes.text}>
                <p>Обязательные поля</p>
              </div>
              <div className={classes.inputs}>
                <div className={classes.left}>
                  <div className={classes.phone}>
                    <label htmlFor="phone">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                    />
                  </div>
                  <div className={classes.last_name}>
                    <label htmlFor="lastName">Фамилия</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                    />
                  </div>
                  <div className={classes.first_name}>
                    <label htmlFor="firstName">Имя</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                    />
                  </div>
                  <div className={classes.password}>
                    <label htmlFor="password">Пароль</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <img
                      src={showPassword ? eye : eye_off}
                      alt=""
                      style={{ position: "absolute" }}
                      onClick={showPassword ? () => setShowPassword(false) : () => setShowPassword(true)}
                    />
                  </div>
                  <div className={classes.repeat_password}>
                    <label htmlFor="repeatPassword">Повторите пароль</label>
                    <input
                      type={showRepeatPassword ? "text" : "password"}
                      name="repeatPassword"
                      id="repeatPassword"
                      required
                      value={regRepeatPassword}
                      onChange={(e) => setRegRepeatPassword(e.target.value)}
                    />
                    <img
                      src={showRepeatPassword ? eye : eye_off}
                      alt=""
                      style={{ position: "absolute" }}
                      onClick={showRepeatPassword ? () => setShowRepeatPassword(false) : () => setShowRepeatPassword(true)}
                    />
                  </div>
                </div>
                <div className={classes.right}>
                  <div className={classes.date}>
                    <label htmlFor="birthdate">Дата рождения</label>
                    <input
                      type="date"
                      name="birthdate"
                      id="birthdate"
                      required
                      value={regBirthDate}
                      onChange={(e) => setRegBirthDate(e.target.value)}
                    />
                  </div>
                  <div className={classes.region}>
                    <label htmlFor="region">Регион</label>
                    <input
                      type="text"
                      name="region"
                      id="region"
                      required
                      value={regRegion}
                      onChange={(e) => setRegRegion(e.target.value)}
                    />
                  </div>
                  <div className={classes.city}>
                    <label htmlFor="city">Населенный пункт</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                    />
                  </div>
                  <div className={classes.gender}>
                    <p>Пол</p>
                    <div className={classes.switch}>
                      <p
                        className={userGender === 0 ? classes.active : null}
                        onClick={() => setUserGender(0)}
                      >
                        Мужской
                      </p>
                      <p
                        className={userGender === 1 ? classes.active : null}
                        onClick={() => setUserGender(1)}
                      >
                        Женский
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.not_required}>
              <div className={classes.text}>
                <p>Необязательные поля</p>
              </div>
              <div className={classes.inputs}>
                <div className={classes.card}>
                  <div>
                    <label htmlFor="firstName">Номер карты</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      readOnly={!userHasCard}
                      disabled={!userHasCard}
                      style={!userHasCard ? { backgroundColor: "#F3F2F1" } : null}
                      value={regCardNumber}
                      onChange={(e) => setRegCardNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <div
                      className={userHasCard ? null : classes.active}
                      onClick={
                        userHasCard
                          ? () => setUserHasCard(false)
                          : () => setUserHasCard(true)
                      }
                    >
                      <img src={check} alt="" />
                    </div>
                    <p>У меня нет карты лояльности</p>
                  </div>
                </div>
                <div className={classes.email}>
                  <label htmlFor="firstName">E-mail</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={classes.buttons}>
              <button type="submit">Зарегистрироваться</button>
              <button type="button" onClick={() => [setPopupState(1), setShowRepeatPassword(false), setShowPassword(false)]}>
                Вход
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
