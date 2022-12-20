import styles from "./../../styles/Admin.module.css";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

const Admin = ({ productList, orderList }) => {
  const [products, setProducts] = useState(productList);
  const [orders, setOrders] = useState(orderList);
  const status = ["preparing", "on the way", "Delivered", "paid"];

  const handleDel = async (id) => {
    try {
      await axios.delete(
        `https://next-js-pizza-app-kartik990.vercel.app/api/products/${id}`
      );
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelOrder = async (id) => {
    try {
      await axios.delete(
        `https://next-js-pizza-app-kartik990.vercel.app/api/orders/${id}`
      );
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const hanldeState = async (id) => {
    const it = orders.filter((order) => order._id === id)[0];
    const newStatus = it.status == 3 ? 0 : it.status + 1;
    try {
      const res = await axios.put(
        `https://next-js-pizza-app-kartik990.vercel.app/api/orders/${id}`,
        {
          status: newStatus,
        }
      );
      setOrders([...orders.filter((order) => order._id !== id), res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {products.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    objectFit="cover"
                    width={50}
                    height={50}
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 6)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.buttone}> Edit </button>
                  <button
                    className={styles.buttond}
                    onClick={() => handleDel(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orders.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 6)}...</td>
                <td>{order.customer}</td>
                <td>{order.address.slice(0, 10)}...</td>
                <td>${order.total}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    onClick={() => hanldeState(order._id)}
                    className={styles.buttonn}
                  >
                    Next
                  </button>
                  <button
                    className={styles.buttond}
                    onClick={() => handleDelOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "admin/login",
        permanent: false,
      },
    };
  }
  const ordersRes = await axios.get(
    `https://next-js-pizza-app-kartik990.vercel.app/api/orders`
  );
  const productsRes = await axios.get(
    `https://next-js-pizza-app-kartik990.vercel.app/api/products`
  );

  return {
    props: {
      orderList: ordersRes.data,
      productList: productsRes.data,
    },
  };
};

export default Admin;
