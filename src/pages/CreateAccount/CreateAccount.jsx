// import React, { useEffect, useState } from "react";
// import styles from "./CreateAccount.module.scss";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export default function CreateAccount() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [Email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [age, setage] = useState("");
//   // const [Status, setStatus] = useState("");
//   const [file, setFile] = useState(null);
//   const [b64, setB64] = useState("");

//   useEffect(() => {
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       setB64(reader.result);
//     };

//     reader.readAsDataURL(file);
//   }, [file]);

//   function check() {
//     if (password.length < 8 || password2.length < 8) {
//       alert(
//         "Пароль должен быть хотя бы 8 символов  или вы не ввели данные вовсе"
//       );
//       return;
//     }
//     if (password !== password2) {
//       alert("Пароли не совпадают");
//       return;
//     }
//     if (username.length < 3 || username.length > 20) {
//       alert("Имя должно содержать от 3 до 20 символов");
//     }

//     if (
//       Email.length < 10 ||
//       Email.length > 50 ||
//       !Email.includes("@") ||
//       !Email.includes(".")
//     ) {
//       alert("Введите корректный Email (10-50 символов, с @ и точкой)");
//       return;
//     }

//     if (age > 120 || age < 18) {
//       alert("Возраст должен быть от 18 до 120 лет");
//       return;
//     }

//     const newUser = {
//       email: Email,
//       username: username,
//       Password: password,
//       age: Number(age),
//       img: b64,
//     };

//     fetch("https://mini-shop-backend-iinw.onrender.com/registration", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.message || data.errors || "Ошибка сервера");
//         }
//         return data;
//       })
//       .then((data) => {
//         alert(data.message);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         setPassword2("");
//         setage("");
//         setFile(null);
//         setB64("");
//         localStorage.setItem("username", username);
//         navigate("/");
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   }

//   return (
//     <div className={styles.CreateAccount}>
//       <div className={styles.container}>
//         <h2>Создать аккаунт</h2>
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className={styles.input}
//           type="text"
//           placeholder="Username"
//         />
//         <input
//           value={Email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input}
//           type="email"
//           placeholder="Email"
//         />
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={styles.input}
//           type="password"
//           placeholder="Пароль"
//         />
//         <input
//           value={password2}
//           onChange={(e) => setPassword2(e.target.value)}
//           className={styles.input}
//           type="password"
//           placeholder="Подтвердите пароль"
//         />
//         <input
//           value={age}
//           onChange={(e) => setage(e.target.value)}
//           className={styles.input}
//           type="number"
//           placeholder="Возраст"
//         />
//         <input
//           className={styles.input}
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <button onClick={check} className={styles.button}>
//           Регистрация
//         </button>

//         {/* <a className={styles.link} href="/">
//           Уже есть аккаунт? Войти
//         </a> */}
//         <Link className={styles.link} to="/">
//           Уже есть аккаунт? Войти
//         </Link>
//         {/* <a className={styles.link} href="/recoverAccount">
//           забыл имя/пароль аккаунта
//         </a> */}
//         <Link className={styles.link} to="/createAccount">
//           забыл имя/пароль аккаунта
//         </Link>
//       </div>
//     </div>
//   );
// }

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const z = require("zod");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// ------------------------
// Подключение MongoDB
// ------------------------
mongoose
  .connect(
    "mongodb+srv://ozodbek:sXu99PB55kKDGP9v@cluster0.ep0acoy.mongodb.net/mini-shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => console.error("Ошибка подключения MongoDB:", err));

// ------------------------
// Подключение моделей
// ------------------------
const User = require("./models/User");
const Product = require("./models/Product");
const Basket = require("./models/Basket");

// ------------------------
// Валидация
// ------------------------
const RegistrationSchema = z.object({
  email: z.string().email(),
  username: z.string().min(5),
  Password: z.string().min(8),
  age: z.number().min(18),
  img: z.string().optional(),
  status: z.enum(["покупатель", "продавец"]).default("покупатель"),
  aboutmyself: z.string().optional(),
});

const aboutMyselfSchema = z.object({
  aboutmyself: z.string().min(1).max(500),
});

// ------------------------
// Главная страница API
// ------------------------
app.get("/", (req, res) => {
  res.json({ message: "Mini Shop API is running!" });
});

// ------------------------
// Получение списка пользователей
// ------------------------
app.get("/users", async (req, res) => {
  const users = await User.find({}, { Password: 0 });
  res.json({ users, total: users.length });
});

// ------------------------
// Регистрация
// ------------------------
app.post("/registration", async (req, res) => {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: "Некорректные данные" });

  const exists = await User.findOne({ username: result.data.username });
  if (exists)
    return res.status(400).json({ error: "Пользователь уже существует" });

  await User.create({
    ...result.data,
    balance: 0,
  });

  res.json({ message: "Регистрация прошла успешно" });
});

// ------------------------
// Логин
// ------------------------
app.post("/userverification", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, Password: password });

  if (!user)
    return res.status(400).json({
      success: false,
      message: "Неверный логин или пароль",
    });

  res.json({
    success: true,
    message: `Добро пожаловать, ${user.username}!`,
  });
});

// ------------------------
// Смена пароля
// ------------------------
app.post("/change/password", async (req, res) => {
  const { oldUsername, newPassword } = req.body;

  const user = await User.findOne({ username: oldUsername });
  if (!user) return res.status(400).json({ error: "Пользователь не найден" });

  user.Password = newPassword;
  await user.save();

  res.json({ success: true, message: "Пароль изменён" });
});

// ------------------------
// Смена username
// ------------------------
app.post("/change/username", async (req, res) => {
  const { oldUsername, newUsername } = req.body;

  const exists = await User.findOne({ username: newUsername });
  if (exists) return res.status(400).json({ error: "Имя уже занято" });

  const user = await User.findOne({ username: oldUsername });
  if (!user) return res.status(400).json({ error: "Пользователь не найден" });

  user.username = newUsername;
  await user.save();

  res.json({
    success: true,
    message: "Имя успешно изменено",
    newUsername,
  });
});

// ------------------------
// Загрузка аватарки
// ------------------------
app.post("/change/photo", async (req, res) => {
  const { username, img } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Пользователь не найден" });

  user.img = img;
  await user.save();

  res.json({ message: "Фото обновлено", img: user.img });
});

// ------------------------
// Получение данных профиля
// ------------------------
app.post("/user_image_submission", async (req, res) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "Пользователь не найден" });

  res.json({
    image: user.img,
    aboutmyself: user.aboutmyself,
    balance: user.balance,
  });
});

// ------------------------
// Обновление информации "о себе"
// ------------------------
app.post("/change/aboutmyself", async (req, res) => {
  const { username, aboutmyself } = req.body;

  const parsed = aboutMyselfSchema.safeParse({ aboutmyself });
  if (!parsed.success)
    return res.status(400).json({ error: "Неверный формат" });

  await User.updateOne({ username }, { aboutmyself });

  res.json({ success: true, message: "Информация обновлена" });
});

// ------------------------
// Удаление аккаунта
// ------------------------
app.post("/delete/account", async (req, res) => {
  const { username } = req.body;

  await User.deleteOne({ username });

  res.json({ success: true, message: "Аккаунт удалён" });
});

// ------------------------
// Публикация товара
// ------------------------
app.post("/checking-product", async (req, res) => {
  const token = crypto.randomBytes(32).toString("hex");

  await Product.create({
    ...req.body,
    price: Number(req.body.price),
    token,
  });

  res.json({ message: "Успешно опубликовано" });
});

// ------------------------
// Получить товары
// ------------------------
app.get("/product", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ------------------------
// Добавить в корзину
// ------------------------
app.post("/checkout-basket", async (req, res) => {
  const { username, product1token, price } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Вы не зарегистрированы" });

  const prod = await Product.findOne({ token: product1token });
  if (!prod) return res.status(400).json({ error: "Продукта нет" });

  if (prod.username === username)
    return res.status(400).json({ error: "Нельзя купить у себя" });

  const exists = await Basket.findOne({
    whoWantsuser: username,
    product: product1token,
  });

  if (exists) return res.status(400).json({ error: "Уже в корзине" });

  await Basket.create({
    whoWantsuser: username,
    toWhomuser: prod.username,
    product: product1token,
    date: Date.now(),
    price,
  });

  res.json({ success: true, message: "Добавлено в корзину" });
});

// ------------------------
// Получить корзину
// ------------------------
app.post("/check-cart", async (req, res) => {
  const { username } = req.body;

  const items = await Basket.find({ whoWantsuser: username });

  const products = await Product.find({
    token: { $in: items.map((i) => i.product) },
  });

  res.json({ success: true, items, products });
});

// ------------------------
// Запуск сервера
// ------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
