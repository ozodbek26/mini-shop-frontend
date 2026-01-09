import React from "react";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.dot} style={{ animationDelay: "0ms" }} />
      <div className={styles.dot} style={{ animationDelay: "200ms" }} />
      <div className={styles.dot} style={{ animationDelay: "400ms" }} />
      <div className={styles.dot} style={{ animationDelay: "600ms" }} />
    </div>
  );
}

