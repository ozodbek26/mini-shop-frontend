import React, { useEffect, useState } from "react";
import styles from "./Technique.module.scss";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const initialGoods = [];

export default function Technique() {
  const navigate = useNavigate();

  const [goods, setGoods] = useState(initialGoods);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});

  function handleClick(ee) {
    console.log(ee);
    setSelected(ee);
    navigate("/details", { state: { product: ee } });
  }

  useEffect(() => {
    fetch("https://mini-shop-backend-iinw.onrender.com/product")
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
    return (
      <p>
        <Loading />
      </p>
    );
  }

  return (
    <div className={styles.Technique}>
      <h1>Раздел с техникой</h1>

      <div className={styles.ert23}>
        {goods
          .filter((ee) => ee.category === "Техника")
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
