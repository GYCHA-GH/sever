import { useState } from "react";
import classes from "./header.module.scss";
import Close from "./img/close.png";

export default function RegistrationPopup({ isOpen, onClose, onRegisterSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Введите имя";
    if (!phone.match(/^\+?\d{10,15}$/)) newErrors.phone = "Введите корректный номер телефона";
    if (password.length < 6) newErrors.password = "Пароль должен быть не менее 6 символов";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ form: data.error || "Произошла ошибка" });
        return;
      }

      localStorage.setItem("token", data.token);
      onRegisterSuccess(data.user);
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ form: "Ошибка сети или сервера" });
    }
  }

  if (!isOpen) return null;

  return (
    <div className={classes.popupOverlay}>
      <div className={classes.popupWindow}>
        <button className={classes.closeButton} onClick={onClose}>
          <img src={Close} alt="Закрыть" />
        </button>
        <h2 className={classes.popupTitle}>Регистрация</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          {errors.form && <p className={classes.error}>{errors.form}</p>}

          <div className={classes.inputGroup}>
            <label>Имя</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span className={classes.error}>{errors.name}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label>Телефон</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <span className={classes.error}>{errors.phone}</span>}
          </div>

          <div className={classes.inputGroup}>
            <label>Пароль</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <span className={classes.error}>{errors.password}</span>}
          </div>

          <button type="submit" className={classes.submitButton}>Регистрация</button>
        </form>
      </div>
    </div>
  );
}
