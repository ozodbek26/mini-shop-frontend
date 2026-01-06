// import React, { useEffect, useState } from "react";
// import styles from "./Header.module.scss";
// import profilePicture from "../../assets/images/profilePicture.png";
// import { useNavigate } from "react-router-dom";

// export default function Header() {
//   const navigate = useNavigate();

//   const [userImage, setUserImage] = useState(null);
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     const username = localStorage.getItem("username");

//     fetch("http://localhost:7000/user_image_submission", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setUserImage(data.image);
//         setBalance(data.balance);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <header className={styles.Header}>
//       <div className={styles.leftSection}>
//         <img className={styles.logo} src="" alt="logo" />
//         <nav className={styles.nav}>
//           <a onClick={() => scrollToSection("vegetables")}>Овощи</a>
//           <a onClick={() => scrollToSection("fruits")}>Фрукты</a>
//           <a onClick={() => scrollToSection("technique")}>Техника</a>
//           <a onClick={() => scrollToSection("materials")}>Материалы</a>
//         </nav>
//         <div className={styles.block}>
//           <input className={styles.block_input} type="text" />
//           <button className={styles.block_button}>найти</button>
//         </div>
//       </div>

//       <div className={styles.rightSection}>
//         <div className={styles.balance}>
//           <span className={styles.balanceLabel}>Баланс</span>
//           <span className={styles.balanceValue}>{balance} $</span>
//         </div>

//         <div
//           className={styles.rightSection_Profile}
//           onClick={() => navigate("/userProfile")}
//         >
//           <img
//             className={styles.rightSection_Profile_img}
//             src={userImage || profilePicture}
//             alt="profilePicture"
//           />
//         </div>
//         <a
//           href="#"
//           onClick={() => navigate("/aboutProducts")}
//           className={styles.action}
//         >
//           Информация о продажах
//         </a>
//         <a href="/basket" className={styles.action}>
//           Корзина
//         </a>
//         <a
//           href="#"
//           onClick={() => {
//             navigate("/publishProduct");
//           }}
//           className={styles.action}
//         >
//           Опубликовать продукт
//         </a>
//       </div>
//     </header>
//   );
// }

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import defaultProfilePicture from "../../assets/images/profilePicture.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [userImage, setUserImage] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:7000/user_image_submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUserImage(data.image || null);
        setBalance(data.balance ?? 0);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setBalance(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику поиска, например: navigate(`/search?q=${searchQuery}`)
    console.log("Поиск:", searchQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img className={styles.logo} src="/logo.png" alt="Логотип сайта" />

        <nav className={styles.nav} aria-label="Категории товаров">
          <button
            onClick={() => scrollToSection("vegetables")}
            className={styles.navLink}
          >
            Овощи
          </button>
          <button
            onClick={() => scrollToSection("fruits")}
            className={styles.navLink}
          >
            Фрукты
          </button>
          <button
            onClick={() => scrollToSection("technique")}
            className={styles.navLink}
          >
            Техника
          </button>
          <button
            onClick={() => scrollToSection("materials")}
            className={styles.navLink}
          >
            Материалы
          </button>
        </nav>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Поиск по сайту"
          />
          <button type="submit" className={styles.searchButton}>
            Найти
          </button>
        </form>
      </div>

      <div className={styles.rightSection}>
        <div
          className={styles.balance}
          aria-label={`Баланс: ${balance ?? "..."} $`}
        >
          <span className={styles.balanceLabel}>Баланс</span>
          <span className={styles.balanceValue}>
            {loading ? "..." : `${balance ?? 0} $`}
          </span>
        </div>

        <button
          className={styles.profileButton}
          onClick={() => navigate("/userProfile")}
          aria-label="Перейти в профиль"
        >
          <img
            src={userImage || defaultProfilePicture}
            alt="Аватар пользователя"
            className={styles.profileImage}
          />
        </button>

        <button
          className={styles.actionButton}
          onClick={() => navigate("/aboutProducts")}
        >
          Информация о продажах
        </button>

        <button
          className={styles.actionButton}
          onClick={() => navigate("/basket")}
        >
          Корзина
        </button>

        <button
          className={styles.actionButton}
          onClick={() => navigate("/publishProduct")}
        >
          Опубликовать продукт
        </button>
      </div>
    </header>
  );
}
