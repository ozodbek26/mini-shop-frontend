import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import defaultProfilePicture from "../../assets/images/profilePicture.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Loading from "../Loading/Loading";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [burgerMenu, setBurgerMenu] = useState(true);

  function search() {
    if (!searchQuery.trim()) {
      alert("Введите хэштег");
      return;
    }

    fetch("https://mini-shop-backend-iinw.onrender.com/checking-hashtag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textFromInput: searchQuery }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products.length > 0) {
          console.log("Найденные товары:", data.products);
          console.log("Найденные товары: ", data.found);
          setSearchResults(data.products);
        } else {
          alert("Ничего не найдено");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Ошибка сервера");
      });
  }

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
            <BurgerMenu />
            {/* {searchResults} */}
            <div className={styles.burgerCategoriesWrapper}>
              <button
                className={styles.burgerToggle}
                onClick={() => setBurgerMenu(!burgerMenu)}
                aria-label="Открыть меню категорий"
                aria-expanded={burgerMenu}
              >
                <span className={styles.burgerIcon}>
                  {burgerMenu ? "✕" : "☰"}
                </span>
                <span className={styles.burgerLabel}>Категории</span>
              </button>

              <div
                className={`${styles.burgerDropdown} ${
                  burgerMenu ? styles.open : ""
                }`}
              >
                <button
                  onClick={() => {
                    scrollToSection("vegetables");
                    setBurgerMenu(false);
                  }}
                  className={styles.burgerItem}
                >
                  {t("header.menu_vegetables")}
                </button>
                <button
                  onClick={() => {
                    scrollToSection("fruits");
                    setBurgerMenu(false);
                  }}
                  className={styles.burgerItem}
                >
                  {t("header.menu_fruits")}
                </button>
                <button
                  onClick={() => {
                    scrollToSection("technique");
                    setBurgerMenu(false);
                  }}
                  className={styles.burgerItem}
                >
                  {t("header.menu_technique")}
                </button>
                <button
                  onClick={() => {
                    scrollToSection("materials");
                    setBurgerMenu(false);
                  }}
                  className={styles.burgerItem}
                >
                  {t("header.menu_materials")}
                </button>
              </div>
            </div>
          </nav>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t("header.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Поиск по сайту"
            />
            <button
              onClick={search}
              type="submit"
              className={styles.searchButton}
            >
              {t("header.search_button")}
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
            aria-label={`${t("header.balance_label")}: ${balance ?? "..."} $`}
          >
            <span className={styles.balanceLabel}>
              {t("header.balance_label")}
            </span>
            <span className={styles.balanceValue}>
              {loading ? "..." : `${balance ?? 0} $`}
            </span>
          </div>

          <button
            className={styles.actionButton}
            onClick={() => navigate("/aboutProducts")}
          >
            {t("header.sales_info")}
          </button>

          <button
            className={styles.actionButton}
            onClick={() => navigate("/basket")}
          >
            {t("header.basket")}
          </button>

          <button
            className={styles.actionButton}
            onClick={() => navigate("/publishProduct")}
          >
            {t("header.publish_product")}
          </button>
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
      </header>

      <div
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}
      >
        <BurgerMenu />
        <form className={styles.mobileSearchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t("header.search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            {t("header.search_button")}
          </button>
        </form>

        <button
          onClick={() => scrollToSection("vegetables")}
          className={styles.mobileMenuItem}
        >
          {t("header.menu_vegetables")}
        </button>

        <button
          onClick={() => scrollToSection("fruits")}
          className={styles.mobileMenuItem}
        >
          {t("header.menu_fruits")}
        </button>

        <button
          onClick={() => scrollToSection("technique")}
          className={styles.mobileMenuItem}
        >
          {t("header.menu_technique")}
        </button>

        <button
          onClick={() => scrollToSection("materials")}
          className={styles.mobileMenuItem}
        >
          {t("header.menu_materials")}
        </button>

        <button
          onClick={() => {
            navigate("/aboutProducts");
            closeMobileMenu();
          }}
          className={styles.mobileMenuItem}
        >
          {t("header.sales_info")}
        </button>

        <button
          onClick={() => {
            navigate("/basket");
            closeMobileMenu();
          }}
          className={styles.mobileMenuItem}
        >
          {t("header.basket")}
        </button>

        <button
          onClick={() => {
            navigate("/publishProduct");
            closeMobileMenu();
          }}
          className={styles.mobileMenuItem}
        >
          {t("header.publish_product")}
        </button>
      </div>
    </>
  );
}
