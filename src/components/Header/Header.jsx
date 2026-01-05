import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import profilePicture from "../../assets/images/profilePicture.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [userImage, setUserImage] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("Текущий пользователь:", username);

    fetch("http://localhost:7000/user_image_submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserImage(data.image);
        setBalance(data.balance);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={styles.Header}>
      <div className={styles.leftSection}>
        <img className={styles.logo} src="" alt="logo" />
        <nav className={styles.nav}>
          <a onClick={() => scrollToSection("vegetables")}>Овощи</a>
          <a onClick={() => scrollToSection("fruits")}>Фрукты</a>
          <a onClick={() => scrollToSection("technique")}>Техника</a>
          <a onClick={() => scrollToSection("materials")}>Материалы</a>
        </nav>
        <div className={styles.block}>
          <input className={styles.block_input} type="text" />
          <button className={styles.block_button}>найти</button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.balance}>
          <span className={styles.balanceLabel}>Баланс</span>
          <span className={styles.balanceValue}>{balance} $</span>
        </div>

        <div
          className={styles.rightSection_Profile}
          onClick={() => navigate("/userProfile")}
        >
          <img
            className={styles.rightSection_Profile_img}
            src={userImage || profilePicture}
            alt="profilePicture"
          />
        </div>
        <a
          href="#"
          onClick={() => navigate("/aboutProducts")}
          className={styles.action}
        >
          Информация о продажах
        </a>
        <a href="#" className={styles.action}>
          Корзина
        </a>
        <a
          href="#"
          onClick={() => {
            navigate("/publishProduct");
          }}
          className={styles.action}
        >
          Опубликовать продукт
        </a>
      </div>
    </header>
  );
}
