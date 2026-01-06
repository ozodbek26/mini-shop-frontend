import React, { useState } from "react";
import styles from "./HomeLogin.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HomeLogin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState(""); // <- пустая строка
  const [password, setPassword] = useState(""); // <- пустая строка
  const [loading, setLoading] = useState(false);

  function examination() {
    if (!username || !password) {
      alert("Введите username и password");
      return;
    }

    setLoading(true);
    // const newUser = {
    //   username,
    //   Password: password,
    // };

    fetch("https://mini-shop-backend-iinw.onrender.com/userverification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(username, password),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || data.errors || "Ошибка сервера");
        }
        return data;
      })
      .then((data) => {
        setUsers(data);
        alert(data.message || "Успешный вход");

        if (data.success) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          setUsername("");
          setPassword("");

          navigate("/mainPage");
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.HomeLogin}>
      <div className={styles.container}>
        <div className={styles.block1}>
          <h2 className={styles.title}>Вход</h2>

          <input
            className={styles.input}
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={examination}
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>

          <Link className={styles.link} to="/createAccount">
            У меня нет аккаунта
          </Link>
        </div>

        <div className={styles.block2}>
          <h2>Добро пожаловать</h2>
          <p>Введите данные для входа</p>
        </div>
      </div>
    </div>
  );
}
