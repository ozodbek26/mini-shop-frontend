import React, { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import { useNavigate } from "react-router-dom";

export default function Basket() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [userBasket, setUserBasket] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }

    fetch("https://mini-shop-backend-iinw.onrender.com/check-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserBasket(data.items);
          setProducts(data.products);

          const indexes = {};
          data.items.forEach((item) => {
            indexes[item.product] = 0;
          });
          setImageIndexes(indexes);
        } else {
          alert(data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [username, navigate]);

  const handleNextImage = (token) => {
    setImageIndexes((prev) => {
      const product = products.find((p) => p.token === token);
      if (!product) return prev;
      const nextIndex = (prev[token] + 1) % product.images.length;
      return { ...prev, [token]: nextIndex };
    });
  };

  const handlePrevImage = (token) => {
    setImageIndexes((prev) => {
      const product = products.find((p) => p.token === token);
      if (!product) return prev;
      const prevIndex =
        (prev[token] - 1 + product.images.length) % product.images.length;
      return { ...prev, [token]: prevIndex };
    });
  };

  const handleCancel = (token) => {
    setUserBasket((prev) => prev.filter((item) => item.product !== token));
    setProducts((prev) => prev.filter((p) => p.token !== token));
  };

  if (loading) return <p className={styles.loading}>Загрузка корзины...</p>;

  if (userBasket.length === 0)
    return (
      <div className={styles.Basket}>
        <h1>Корзина</h1>
        <p>Ваша корзина пуста</p>

        <div className={styles.back}>
          <button
            onClick={() => {
              navigate("/mainPage");
            }}
          >
            ← Назад
          </button>
        </div>
      </div>
    );
  const total = userBasket.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.Basket}>
      <div>
        <h1>Корзина</h1>
        <div className={styles.back}>
          <button
            onClick={() => {
              navigate("/mainPage");
            }}
          >
            ← Назад
          </button>
        </div>
      </div>
      <div className={styles.list}>
        {userBasket.map((item) => {
          const product = products.find((p) => p.token === item.product);
          if (!product) return null;

          const currentIndex = imageIndexes[item.product] || 0;

          return (
            <div key={item.product} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{product.productName}</h3>
                <span className={styles.price}>{item.price} $</span>
              </div>

              <div className={styles.mainImage}>
                <img
                  src={product.images[currentIndex]}
                  alt={product.productName}
                />
              </div>

              <div className={styles.imageButtons}>
                <button onClick={() => handlePrevImage(item.product)}>
                  Назад
                </button>
                <button onClick={() => handleNextImage(item.product)}>
                  Вперед
                </button>
              </div>

              <p>
                <strong>Продавец:</strong> {item.toWhomuser}
              </p>
              <p>
                <strong>Категория:</strong> {product.category}
              </p>
              <p>
                <strong>Описание:</strong> {product.peculiarities}
              </p>

              {product.hashtags.length > 0 && (
                <div className={styles.hashtags}>
                  {product.hashtags.map((tag, i) => (
                    <span key={i}>#{tag}</span>
                  ))}
                </div>
              )}

              <p className={styles.date}>
                Добавлено: {new Date(item.date).toLocaleString()}
              </p>

              <div style={{ display: "flex", marginTop: "10px" }}>
                <button
                  className={styles.checkout}
                  onClick={() => alert("Оформление заказа")}
                >
                  Оформить заказ
                </button>
                <button
                  className={styles.cancel}
                  onClick={() => handleCancel(item.product)}
                >
                  Отменить
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.total}>
        <h3>Итого: {total} $</h3>
        <button
          className={styles.checkout}
          onClick={() => alert("Оформление всего заказа")}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
