import React from "react";
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
          onChange={(e) => {
            if (type === "file") {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setText(reader.result);
              reader.readAsDataURL(file);
            } else {
              setText(e.target.value);
            }
          }}
          placeholder={placeholder}
          value={type !== "file" ? text : undefined} 
        />
        <button onClick={handleSubmit}>Отправить</button>
      </div>
    </div>
  );
}
