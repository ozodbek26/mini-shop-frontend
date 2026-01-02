import React, { useEffect, useState } from "react";
import styles from "./CreateAccount.module.scss";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [age, setage] = useState("");
  // const [Status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [b64, setB64] = useState("");

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setB64(reader.result);
    };

    reader.readAsDataURL(file);
  }, [file]);

  function check() {
    if (password.length < 8 || password2.length < 8) {
      alert(
        "Пароль должен быть хотя бы 8 символов  или вы не ввели данные вовсе"
      );
      return;
    }
    if (password !== password2) {
      alert("Пароли не совпадают");
      return;
    }
    if (username.length < 3 || username.length > 20) {
      alert("Имя должно содержать от 3 до 20 символов");
    }

    if (
      Email.length < 10 ||
      Email.length > 50 ||
      !Email.includes("@") ||
      !Email.includes(".")
    ) {
      alert("Введите корректный Email (10-50 символов, с @ и точкой)");
      return;
    }

    if (age > 120 || age < 18) {
      alert("Возраст должен быть от 18 до 120 лет");
      return;
    }

    const newUser = {
      email: Email,
      username: username,
      Password: password,
      age: Number(age),
      img: b64,
    };

    fetch("http://localhost:7000/registration", {
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
        alert(data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        setPassword2("");
        setage("");
        setFile(null);
        setB64("");
        localStorage.setItem("username", username);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className={styles.CreateAccount}>
      <div className={styles.container}>
        <h2>Создать аккаунт</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Username"
        />
        <input
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="Пароль"
        />
        <input
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="Подтвердите пароль"
        />
        <input
          value={age}
          onChange={(e) => setage(e.target.value)}
          className={styles.input}
          type="number"
          placeholder="Возраст"
        />
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={check} className={styles.button}>
          Регистрация
        </button>

        <a className={styles.link} href="/">
          Уже есть аккаунт? Войти
        </a>
      </div>
    </div>
  );
}
