import React, { useState } from "react";
import styles from "./PublishProduct.module.scss";
import { useNavigate } from "react-router-dom";

export default function PublishProduct() {
  const savedUser = localStorage.getItem("username");

  const navigate = useNavigate();
  // цена
  const [price, setPrice] = useState("");

  // название товара
  const [productName, setProductName] = useState("");

  // особенности товара
  const [peculiarities, setPeculiarities] = useState("");

  // способ получения --- Как можно забрать товар
  const [deliveryMethod, setDeliveryMethod] = useState("");

  // срок хранения
  const [storageTime, setStorageTime] = useState("");

  // выбранная категория --- Тип товара
  const [category, setCategory] = useState("");

  // список хештегов
  const [hashtags, setHashtags] = useState([]);

  // изображения товара (максимум 5)
  const [images, setImages] = useState([]);

  // текущий ввод хештега
  const [hashtag, setHashtag] = useState("");

  function handleFileChange(e) {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 6) {
      alert("Максимум 6 фотографий!");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  function addHashtag() {
    const value = hashtag.trim();

    if (!value) return;
    if (value.length < 3 || value.length > 35) {
      return alert("Хештег от 3 до 35 символов");
    }
    if (hashtags.length >= 20) {
      return alert("Максимум 20 хештегов");
    }
    if (hashtags.includes(value)) {
      return alert("Такой хештег уже есть");
    }

    setHashtags((prev) => [...prev, value]);
    setHashtag("");
  }

  function validateProduct() {
    if (
      !price ||
      !productName ||
      !peculiarities ||
      !deliveryMethod ||
      !storageTime ||
      !category ||
      hashtags.length === 0 ||
      images.length === 0
    ) {
      alert("Все поля обязательны");
      return;
    }

    const priceNumber = Number(price);

    if (Number.isNaN(priceNumber)) {
      alert("Цена должна быть числом");
      return;
    }

    if (priceNumber <= 0 || priceNumber > 9999999999) {
      alert("Цена должна быть больше 0 и меньше 9 999 999 999");
      return;
    }

    if (productName.length < 10 || productName.length > 250) {
      alert("Название товара должно быть от 10 до 250 символов");
      return;
    }

    if (peculiarities.length < 20 || peculiarities.length > 750) {
      alert("Описание должно быть от 20 до 750 символов");
      return;
    }

    if (deliveryMethod.length < 10 || deliveryMethod.length > 250) {
      alert("Способ получения должен быть от 10 до 250 символов");
      return;
    }

    if (storageTime.length < 10 || storageTime.length > 250) {
      alert("Срок хранения должен быть от 10 до 250 символов");
      return;
    }

    if (hashtags.length < 5 || hashtags.length > 20) {
      alert("Количество хештегов должно быть от 5 до 20");
      return;
    }

    if (images.length < 5) {
      alert("Необходимо загрузить минимум 5 изображений");
      return;
    }

    const result = {
      username: savedUser,
      price,
      productName,
      peculiarities,
      deliveryMethod,
      storageTime,
      category,
      hashtags,
      images,
    };

    fetch("http://localhost:7000/checking-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert("Ошибка: " + JSON.stringify(data.error));
        else alert("Успешно опубликовано!");
      })
      .catch((err) => alert("Сервер недоступен"));
  }

  return (
    <div className={styles.PublishProduct}>
      <div className={styles.back}>
        <button onClick={() => navigate("/mainPage")}>← Назад</button>
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Публикация товара</h1>

        <section className={styles.section}>
          <h2>Описание</h2>

          <label>
            Цена
            <div className={styles.priceInput}>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Например: 1500"
                min="0"
                max="9999999999"
              />
              <span>$</span>
            </div>
          </label>

          <label>
            Название товара
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Например: iPhone 13"
            />
          </label>

          <label>
            Особенности
            <textarea
              value={peculiarities}
              onChange={(e) => setPeculiarities(e.target.value)}
              placeholder="Цвет, состояние, комплектация"
            />
          </label>

          <label>
            Как можно забрать товар
            <input
              type="text"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              placeholder="Самовывоз / доставка"
            />
          </label>

          <label>
            Срок хранения
            <input
              type="text"
              value={storageTime}
              onChange={(e) => setStorageTime(e.target.value)}
              placeholder="Нескоропортящийся"
            />
          </label>
        </section>
        <section className={styles.section}>
          <h2>Фотографии товара</h2>

          <p className={styles.hint}>Можно загрузить до 5 изображений</p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={images.length >= 5}
          />

          {images.length > 0 && (
            <div className={styles.preview}>
              {images.map((src, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img src={src} alt={`Товар ${index + 1}`} />
                  <button
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== index))
                    }
                    className={styles.removeImage}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length < 5 && <p>{5 - images.length} фото можно добавить</p>}
        </section>

        <section className={styles.section}>
          <h2>Тип товара</h2>

          <div className={styles.checkboxes}>
            {["Техника", "Материалы", "Фрукты", "Овощи"].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={category === item}
                  onChange={() => setCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Хештеги</h2>

          <p className={styles.hint}>
            От 3 до 35 символов. Максимум 20 хештегов
          </p>

          <div className={styles.tagsInput}>
            <input
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              placeholder="#iphone"
            />
            <button onClick={addHashtag}>Добавить</button>
          </div>

          <div className={styles.tags}>
            {hashtags.map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
          </div>
        </section>

        <button onClick={validateProduct} className={styles.publish}>
          Опубликовать
        </button>
      </div>
    </div>
  );
}
