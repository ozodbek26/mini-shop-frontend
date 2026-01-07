import React, { useState } from "react";
import i18n from "i18next";
import styles from "./BurgerMenu.module.scss";
import translation from "../../assets/images/translation.png";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  function changeLang(lang) {
    i18n.changeLanguage(lang);
    setOpen(false);
  }

  return (
    <div className={styles.BurgerMenu}>
      <button onClick={() => setOpen(!open)}>
        <img className={styles.img34} src={translation} alt="" />
      </button>

      {open && (
        <div className={styles.menu}>
          <button onClick={() => changeLang("ru")}>RU</button>
          <button onClick={() => changeLang("en")}>EN</button>
          <button onClick={() => changeLang("ky")}>KY</button>
        </div>
      )}
    </div>
  );
}
