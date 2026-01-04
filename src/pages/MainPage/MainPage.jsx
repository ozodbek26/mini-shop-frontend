import React from "react";

import styles from "./MainPage.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Technique from "../../components/Technique/Technique";

export default function MainPage() {
  return (
    <div className={styles.MainPage}>
      <Header />
      <div className={styles.container} >
        <p>MainPage</p>

        <Technique />
      </div>
      <Footer />
    </div>
  );
}
