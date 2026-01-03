import React, { useState } from "react";
import styles from "./Aboutmysel.module.scss";

export default function Aboutmysel({
  toggleInput,
  showInput,
  setText,
  handleSubmit,
  text,
  buttonText,
  placeholder,
  type,
}) {
  return (
    <div className={styles.aboutMyself}>
      <button className={styles.addButton} onClick={toggleInput}>
        {buttonText}
      </button>

      <div className={`${styles.inputBlock} ${showInput ? styles.show : ""}`}>
        <input
          type={type}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
        />
        <button onClick={handleSubmit}>Отправить</button>
      </div>
    </div>
  );
}
