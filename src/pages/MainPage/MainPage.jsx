import React from "react";

import styles from "./MainPage.module.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Technique from "../../components/Technique/Technique";
import Materials from "../../components/Materials/Materials";
import Fruits from "../../components/Fruits/Fruits";
import Vegetables from "../../components/Vegetables/Vegetables";

export default function MainPage() {
  return (
    <div className={styles.MainPage}>
      <Header />
      <div className={styles.container}>
        <section id="technique">
          <Technique />
        </section>
        <section id="materials">
          <Materials />
        </section>
        <section id="fruits">
          <Fruits />
        </section>
        <section id="vegetables">
          <Vegetables />
        </section>
      </div>
      <Footer />
    </div>
  );
}
