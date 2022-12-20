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

  console.log(window.location);
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
    "https://next-js-pizza-app-kartik990.vercel.app/api/products"
  );
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
