import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Fruits.module.scss";
const initialGoods = [];

export default function Fruits() {
  const navigate = useNavigate();
  const [goods, setGoods] = useState(initialGoods);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState();

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

  function handleClick(ee) {
    console.log(ee);
    setSelected(ee);
    navigate("/details", { state: { product: ee } });
  }
  if (loading) {
    return <p>Загрузка товаров...</p>;
  }
  return (
    <div className={styles.Fruits}>
      <h1>Раздел с Фрукты</h1>

      <div className={styles.ert23}>
        {goods
          .filter((ee) => ee.category === "Фрукты")
          .map((ee, k) => (
            <div onClick={() => handleClick(ee)} className={styles.dfg} key={k}>
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
                                <button> в корзину</button>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
