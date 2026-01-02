import React, { useState } from "react";
import styles from "./HomeLogin.module.scss";
import { useNavigate } from "react-router-dom";

export default function HomeLogin() {
  const navigate = useNavigate();

  const [users, setUsers] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  function examination() {
    const newUser = {
      username: username,
      Password: password,
    };

    fetch("http://localhost:7000/userverification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
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
        alert(data.message);

        if (data.success) {
          localStorage.setItem("username", JSON.stringify(username));
          localStorage.setItem("password", JSON.stringify(password));
          setUsername("");
          setPassword("");
          navigate("/mainPage");
        }
      })
      .catch((error) => {
        alert(error.message);
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

          <button onClick={examination} className={styles.button}>
            Войти
          </button>

          <a className={styles.link} href="/createAccount">
            У меня нет аккаунта
          </a>
        </div>

        <div className={styles.block2}>
          <h2>Добро пожаловать</h2>
          <p>Введите данные для входа</p>
        </div>
      </div>
    </div>
  );
}

// userverification
