import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";

import profilePicture from "../../assets/images/profilePicture.png";

export default function Header() {
  const [userImage, setUserImage] = useState(null);


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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.leftSection}>
        <img className={styles.logo} src="" alt="logo" />
        <nav className={styles.nav}>
          <a href="#">Овощи</a>
          <a href="#">Фрукты</a>
          <a href="#">Техника</a>
          <a href="#">Материалы</a>
        </nav>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.rightSection_Profile}>
          <img
            className={styles.rightSection_Profile_img}
            src={userImage}
            alt="profilePicture"
          />
        </div>
        <a href="#" className={styles.action}>
          Информация о продажах
        </a>
        <a href="#" className={styles.action}>
          Корзина
        </a>
        <a href="#" className={styles.action}>
          Опубликовать продукт
        </a>
      </div>
    </header>
  );
}
