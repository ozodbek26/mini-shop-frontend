import React from "react";

import styles from "./MainPage.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function 
MainPage() {
  return (
    <div className={styles.MainPage}>
      <Header />
      <div>
        <p>MainPage</p>
      </div>
      <Footer />
    </div>
  );
}
