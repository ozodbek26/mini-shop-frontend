import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Details.module.scss";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [mainImage, setMainImage] = useState(product?.images[0]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Товар не найден</p>
        <button onClick={() => navigate(-1)}>← Назад</button>
      </div>
    );
  }

  return (
    <div className={styles.Details}>
      <div className={styles.back}>
        <button onClick={() => navigate(-1)}>← Назад</button>
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>{product.productName}</h1>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img
              src={mainImage || product.images[0]}
              alt={product.productName}
            />
          </div>

          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Фото ${i + 1}`}
                  className={mainImage === img ? styles.active : ""}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Цена</span>
            <span className={styles.price}>{product.price} $</span>
          </div>

          <div className={styles.details}>
            <p>
              <strong>Описание:</strong> {product.peculiarities}
            </p>
            <p>
              <strong>Доставка:</strong> {product.deliveryMethod}
            </p>
            <p>
              <strong>Хранение:</strong> {product.storageTime}
            </p>
            <p>
              <strong>Категория:</strong> {product.category}
            </p>
            {product.username && (
              <p>
                <strong>Продавец:</strong> {product.username}
              </p>
            )}
          </div>

          {product.hashtags?.length > 0 && (
            <div className={styles.tags}>
              {product.hashtags.map((tag, i) => (
                <span key={i}>#{tag}</span>
              ))}
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.contact}>Написать продавцу</button>
            <button className={styles.buy}>в корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
}
