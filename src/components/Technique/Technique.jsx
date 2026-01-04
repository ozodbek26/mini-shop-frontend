import React, { useEffect, useState } from "react";
import styles from "./Technique.module.scss";

const initialGoods = [];

export default function Technique() {
  const [goods, setGoods] = useState(initialGoods);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:7000/product")
      .then((res) => res.json())
      .then((data) => {
        setGoods((prev) => [...prev, ...data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Загрузка товаров...</p>;
  }

  return (
    <div className={styles.Technique}>
      <h1>Раздел с техникой</h1>

      <div className={styles.ert23}>
        {goods
          .filter((ee) => ee.category === "Техника")
          .map((ee, k) => (
            <div className={styles.dfg} key={k}>
              <img src={ee.images[0]} alt={ee.productName} />
              <div className={styles.info}>
                <p className={styles.label}>Название товара</p>
                <p className={styles.name}>{ee.productName}</p>
              </div>
              <div className={styles.info}>
                <p className={styles.label}>Цена</p>
                <p className={styles.price}>${ee.price}</p>
              </div>
              <div className={styles.tags}>
                {ee.hashtags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <div className={styles.actions}>
                <button>Купить</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
