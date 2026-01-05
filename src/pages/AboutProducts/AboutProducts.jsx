import React, { useEffect, useState } from "react";
import styles from "./AboutProducts.module.scss";
import { useNavigate } from "react-router-dom";

export default function AboutProducts() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [allProducts, setAllProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7000/product")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data || []);
      })
      .catch(console.error);

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

  useEffect(() => {
    const filtered = allProducts.filter((item) => item.username === username);

    setCustomProducts(filtered);
  }, [allProducts, username]);

  return (
    <div className={styles.AboutProducts}>
      <div className={styles.back}>
        <button onClick={() => navigate("/mainPage")}>← Назад</button>
      </div>
      <h1>О продуктах</h1>

      <div className={styles.search}>
        <div className={styles.userProfile}>
          <img src={userImage} alt="profile" className={styles.userImage} />
        </div>

        <input type="text" placeholder="Поиск товара..." />
        <button>Найти</button>
      </div>

      <div className={styles.yourGoods}>
        {customProducts.map((ee, index) => (
          <div key={index} className={styles.block}>
            <h2>{ee.productName}</h2>

            <p className={styles.price}>Цена: ${ee.price}</p>
            <p>
              <strong>Описание:</strong> {ee.peculiarities}
            </p>
            <p>
              <strong>Доставка:</strong> {ee.deliveryMethod}
            </p>
            <p>
              <strong>Хранение:</strong> {ee.storageTime}
            </p>
            <p>
              <strong>Категория:</strong> {ee.category}
            </p>

            <div className={styles.tags}>
              {ee.hashtags.map((tag, i) => (
                <span key={i}>#{tag}</span>
              ))}
            </div>

            <div className={styles.images}>
              {ee.images.map((img, i) => (
                <img key={i} src={img} alt="product" />
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles.edit}>Изменить</button>
              <button className={styles.delete}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
