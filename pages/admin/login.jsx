import styles from "./../../styles/Login.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post(
        `https://next-js-pizza-app-beta.vercel.app/api/login`,
        {
          username,
          password,
        }
        // {
        //   headers: { "Accept-Encoding": "gzip,deflate,compress" },
        // }
      );
      router.push("/admin");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          className={styles.input}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign in
        </button>
        {error && <span className={styles.error}> Wrong credentials...!</span>}
      </div>
    </div>
  );
};

export default Login;
