import React, { useEffect } from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  useEffect(() => {
    const df = localStorage.getItem("username");

    alert("привет" + df);
  }, []);
  return (
    <footer className={styles.Footer}>
      <div className={styles.column}>
        <h4>О нас</h4>
        <a href="#">об омне ААААААА</a>
      </div>

      <div className={styles.column}>
        <h4>Контакты</h4>
        <a href="mailto:info@example.com">Email: ozodbek200017@gmail.com</a>
        <a href="tel:+1234567890">Телефон: пока что нету{"("} </a>
      </div>

      <div className={styles.column}>
        <h4>Соцсети</h4>
        <a href="#">Instagram</a>
        <a href="#">Telegram</a>
        <a href="#">WhatsApp</a>
      </div>
    </footer>
  );
}
