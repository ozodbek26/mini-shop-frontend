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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setLoading(false);
      return;
    }
    fetch("https://mini-shop-backend-iinw.onrender.com/user_image_submission", {
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
      .finally(() => setLoading(false));
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Поиск:", searchQuery);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
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

          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
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

      <div
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}
      >
        <form className={styles.mobileSearchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Найти
          </button>
        </form>

        <button
          onClick={() => scrollToSection("vegetables")}
          className={styles.mobileMenuItem}
        >
          Овощи
        </button>
        <button
          onClick={() => scrollToSection("fruits")}
          className={styles.mobileMenuItem}
        >
          Фрукты
        </button>
        <button
          onClick={() => scrollToSection("technique")}
          className={styles.mobileMenuItem}
        >
          Техника
        </button>
        <button
          onClick={() => scrollToSection("materials")}
          className={styles.mobileMenuItem}
        >
          Материалы
        </button>

        <button
          onClick={() => {
            navigate("/aboutProducts");
            closeMobileMenu();
          }}
          className={styles.mobileMenuItem}
        >
          Информация о продажах
        </button>
        <button
          onClick={() => {
            navigate("/basket");
            closeMobileMenu();
          }}
          className={styles.mobileMenuItem}
        >
          Корзина
        </button>
        <button
          onClick={() => {
            navigate("/publishProduct");
            closeMobileMenu();
          }}
          className={styles.mobileMenuItem}
        >
          Опубликовать продукт
        </button>
      </div>
    </>
  );
}
