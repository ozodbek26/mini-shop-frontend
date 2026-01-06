import React, { useState } from "react";
import styles from "./Aboutmysel.module.scss";
import { useNavigate } from "react-router-dom";

export default function RecoverAccount() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [df2, setDf2] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [canSend2, setCanSend2] = useState(true);

  const navigate = useNavigate();

  function handleSubmit() {
    if (!email) return alert("Введите email!");
    if (!canSend) return alert("Подождите 20 секунд перед повторной отправкой");

    setCanSend(false);
    setTimeout(() => setCanSend(true), 50000);
    fetch("https://mini-shop-backend-iinw.onrender.com/recover-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailInput: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setDf2(data.success);
        setEmail("");
      })
      .catch((error) => console.error(error));
  }

  function handleTokenCheck() {
    if (!token) return alert("Введите token!");
    if (!canSend2)
      return alert("Подождите 20 секунд перед повторной отправкой");

    fetch("https://mini-shop-backend-iinw.onrender.com/time-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenInput: token.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        alert(
          `вот ваш логин и пароль username:${data.username} и Password:${data.Password}`
        );
        setToken("");
        setCanSend2(false);
        setTimeout(() => setCanSend2(true), 50000);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className={styles.RecoverAccount}>
      <div className={styles.card}>
        <h2 className={styles.title}>Восстановление аккаунта</h2>

        <p className={styles.description}>
          Введите email, указанный при регистрации. Мы отправим инструкции по
          восстановлению доступа.(Пожалуйста, подождите 30 секунд после
          отправки.)
        </p>

        <div className={styles.field}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="myemail@mail.com"
          />
          <span className={styles.hint}>
            Проверьте папку «Спам», если письмо не пришло
          </span>
        </div>

        {df2 && (
          <div className={styles.field}>
            <label>Введите токен</label>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="text"
              placeholder="Введите код из письма"
            />
            <button onClick={handleTokenCheck} className={styles.submit}>
              проверить токен
            </button>
          </div>
        )}

        <button onClick={handleSubmit} className={styles.submit}>
          Отправить письмо
        </button>

        <button onClick={() => navigate("/")} className={styles.back}>
          ← Вернуться ко входу
        </button>
      </div>
    </div>
  );
}
