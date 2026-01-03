import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.scss";

import { data, useNavigate } from "react-router-dom";
import Aboutmysel from "../../components/Aboutmysel/Aboutmysel";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [username23, setUsername23] = useState("");
  const [aboutmyself23, setAboutmyself] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    setUsername23(username);

    fetch("http://localhost:7000/user_image_submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserImage(data.image);
        setAboutmyself(data.aboutmyself);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [text, setText] = useState("");
  const [f1, setF1] = useState(false);

  function name1() {
    setF1(!f1);
  }

  function handleSubmit() {
    if (!text || text.length < 10 || text.length > 50) {
      alert("Текст должен быть от 10 до 50 символов");
      return;
    }
    const wf = {
      oldUser: { username },
      aboutmyself: text,
    };
    fetch("http://localhost:7000/change/aboutmyself", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wf),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setText("");
        setF1(false);
      })

      .catch((err) => {
        console.error(err);
      });
  }

  const [f2, setF2] = useState(false);
  const [text2, setText2] = useState("");

  function name2() {
    setF2(!f2);
  }

  function changePassword() {
    if (!text2 || text2.length < 8 || text2.length > 20) {
      alert("Пароль должен быть от 8 до 20 символов");
      return;
    }

    const payload = {
      newPassword: text2,
      oldUsername: username,
    };

    fetch("http://localhost:7000/change/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        alert(data.message);
        setText2("");
        setF2(false);
      })
      .catch((err) => {
        console.error(err);
        alert(err.error || "Не удалось изменить пароль");
      });
  }

  const [f3, setF3] = useState(false);
  const [text3, setText3] = useState("");

  function name3() {
    setF3(!f3);
  }

  function nameCheck() {
    if (!text3 || text3.length < 5 || text3.length > 20) {
      alert("Имя должно быть от 5 до 20 символов");
      return;
    }

    const trimmedNewName = text3.trim();

    if (trimmedNewName === username) {
      alert("Новое имя не может быть таким же, как старое");
      return;
    }

    const payload = {
      oldUsername: username,
      newUsername: trimmedNewName,
    };

    fetch("http://localhost:7000/change/username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw res.json();
        return res.json();
      })
      .then((data) => {
        alert(data.message);

        localStorage.setItem("username", data.newUsername);

        setUsername23(data.newUsername);

        fetch("http://localhost:7000/user_image_submission", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: data.newUsername }),
        })
          .then((res) => res.json())
          .then((newData) => {
            setUserImage(newData.image);
            setAboutmyself(newData.aboutmysel);
          })
          .catch((err) => console.error("Ошибка перезагрузки данных:", err));

        setText3("");
        setF3(false);
      })
      .catch(async (errData) => {
        const err = await errData;
        console.error(err);
        alert(err.error || "Не удалось изменить имя");
      });
  }

  const [f4, setF4] = useState(false);
  const [text4, setText4] = useState("");

  function name4() {
    setF4(!f4);
  }

  function changePhoto() {
    if (!text4) {
      alert("в не загрузиле нечего");
      return;
    }

    const payload = {
      username,
      img: text4,
    };
    fetch("http://localhost:7000/change/photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={styles.page}>
      <div className={styles.back}>
        <button
          onClick={() => {
            navigate("/mainPage");
          }}
        >
          ← Назад
        </button>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          <img src={userImage} alt="Profile" />
        </div>

        <div className={styles.about}>
          <h2>{username23}</h2>

          <p>{aboutmyself23}</p>
        </div>

        <div className={styles.actions}>
          <Aboutmysel
            buttonText={"Сменить фото"}
            showInput={f4}
            toggleInput={name4}
            setText={setText4}
            text={text4}
            handleSubmit={changePhoto}
            placeholder={"напиши свое новое имя"}
            type={"file"}
          />
          <Aboutmysel
            buttonText={"Сменить имя"}
            showInput={f3}
            toggleInput={name3}
            setText={setText3}
            text={text3}
            handleSubmit={nameCheck}
            placeholder={"напиши свое новое имя"}
            type={"text"}
          />
          <Aboutmysel
            buttonText={"Сменить пароль"}
            showInput={f2}
            toggleInput={name2}
            setText={setText2}
            text={text2}
            handleSubmit={changePassword}
            placeholder={"напиши свое новой пароль"}
            type={"text"}
          />
          <Aboutmysel
            buttonText={"Добавить что-то о себе"}
            toggleInput={name1}
            showInput={f1}
            setText={setText}
            handleSubmit={handleSubmit}
            text={text}
            placeholder={"добавьте что-нибудь о себе"}
            type={"text"}
          />
        </div>

        <div className={styles.danger}>
          <button
            className={styles.logout}
            onClick={() => {
              navigate("/");
            }}
          >
            Выйти
          </button>
          <button className={styles.delete}>Удалить аккаунт</button>
        </div>
      </div>
    </div>
  );
}

// const { oldUser, img } = req.body;
