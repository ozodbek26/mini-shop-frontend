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
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <section id="vegetables" className={styles.section}>
            <Vegetables />
          </section>

          <section id="fruits" className={styles.section}>
            <Fruits />
          </section>

          <section id="technique" className={styles.section}>
            <Technique />
          </section>

          <section id="materials" className={styles.section}>
            <Materials />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
