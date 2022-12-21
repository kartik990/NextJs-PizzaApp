import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddButton from "../components/AddButton";
import AddModel from "../components/AddModel";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);

  console.log(process.env.ADMIN_PASSWORD === "passway00");

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Shop</title>
        <meta name="description" content="Best pizza shop online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddModel setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const mycookie = ctx.req?.cookies || "";
  let admin = false;
  if (mycookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(
    "https://next-js-pizza-app-beta.vercel.app/api/products/",
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );

  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
