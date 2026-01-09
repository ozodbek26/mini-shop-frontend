// import React, { useState } from "react";
// import i18n from "i18next";
// import styles from "./BurgerMenu.module.scss";
// import translation from "../../assets/images/translation.png";

// export default function BurgerMenu() {
//   const [open, setOpen] = useState(false);

//   function changeLang(lang) {
//     i18n.changeLanguage(lang);
//     setOpen(false);
//   }

//   return (
//     <div className={styles.BurgerMenu}>
//       <button onClick={() => setOpen(!open)}>
//         <img className={styles.img34} src={translation} alt="" />
//       </button>

//       {open && (
//         <div className={styles.menu}>
//           <button onClick={() => changeLang("ru")}>RU</button>
//           <button onClick={() => changeLang("en")}>EN</button>
//           <button onClick={() => changeLang("ky")}>KY</button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import i18n from "i18next";
import styles from "./BurgerMenu.module.scss";
import translationIcon from "../../assets/images/translation.png";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const currentLang = i18n.language.toUpperCase().slice(0, 2);
  function changeLang(lang) {
    i18n.changeLanguage(lang);
    setOpen(false);
  }

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.toggleButton}
        onClick={() => setOpen(!open)}
        aria-label="Сменить язык"
        aria-expanded={open}
      >
        <img src={translationIcon} alt="" className={styles.icon} />
        <span className={styles.currentLang}>{currentLang}</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <button onClick={() => changeLang("ru")} className={styles.langItem}>
            Русский
          </button>
          <button onClick={() => changeLang("en")} className={styles.langItem}>
            English
          </button>
          <button onClick={() => changeLang("ky")} className={styles.langItem}>
            Кыргызча
          </button>
        </div>
      )}

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
