import React, { useState } from "react";
import styles from "./HomeLogin.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

export default function HomeLogin() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function examination() {
    if (!username || !password) {
      alert(t("home.error_enter_username_password"));
      return;
    }

    setLoading(true);

    fetch("https://mini-shop-backend-iinw.onrender.com/userverification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            data.message || data.errors || t("home.error_server")
          );
        }
        return data;
      })
      .then((data) => {
        setUsers(data);
        alert(data.message || t("home.success_login"));

        if (data.success) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          setUsername("");
          setPassword("");

          navigate("/mainPage");
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => setLoading(false));
  }

  function guest() {
    localStorage.setItem("username", "guesttext");
    navigate("/mainPage");
  }

  return (
    <div className={styles.HomeLogin}>
      <div className={styles.container}>
        <div>
          <BurgerMenu />
        </div>
        <div className={styles.block1}>
          <h2 className={styles.title}>{t("home.login_title")}</h2>

          <input
            className={styles.input}
            placeholder={t("home.login_username_placeholder")}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className={styles.input}
            placeholder={t("home.login_password_placeholder")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={examination}
            className={styles.button}
            disabled={loading}
          >
            {loading ? t("home.login_loading") : t("home.login_button")}
          </button>

          <button onClick={guest} className={styles.button}>
            {t("home.login_guest")}
          </button>

          <Link className={styles.link} to="/createAccount">
            {t("home.login_no_account")}
          </Link>
        </div>

        <div className={styles.block2}>
          <h2>{t("home.welcome_title")}</h2>
          <p>{t("home.welcome_subtitle")}</p>
        </div>
      </div>
    </div>
  );
}
