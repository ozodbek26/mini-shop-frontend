import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.scss";

import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [userImage, setUserImage] = useState(null);
    const [username23, setUsername23] = useState("");


  useEffect(() => {
    const username = localStorage.getItem("username");

    setUsername23(username);

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

  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.back}>
        <button
          onClick={() => {
            navigate("/mainPage");
          }}
        >
          ← Назад
        </button>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          <img src={userImage} alt="Profile" />
        </div>

        <div className={styles.about}>
          <h2>{username23}</h2>
          <p>
            Здесь текст «о себе». Краткая информация о пользователе, описание,
            интересы или статус.
          </p>
        </div>

        <div className={styles.actions}>
          <button>Сменить фото</button>
          <button>Сменить имя</button>
          <button>Сменить пароль</button>
          <button>добавить что то о себе</button>
        </div>

        <div className={styles.danger}>
          <button
            className={styles.logout}
            onClick={() => {
              navigate("/");
            }}
          >
            Выйти
          </button>
          <button className={styles.delete}>Удалить аккаунт</button>
        </div>
      </div>
    </div>
  );
}
