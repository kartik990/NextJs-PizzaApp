import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "./../redux/cartSlice";

const Cart = () => {
  const [ready, setReady] = useState("closed");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  const createOrder = async () => {
    const data = {
      customer: name,
      address,
      total: cart.total,
      method: 0,
    };

    try {
      const res = await axios.post(
        `https://next-js-pizza-app-beta.vercel.app/api/orders`,
        data,
        {
          headers: { "Accept-Encoding": "gzip,deflate,compress" },
        }
      );
      dispatch(reset());
      router.push("/orders/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {ready === "closed" && (
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </tbody>
            <tbody>
              {cart.products.map((product) => (
                <tr key={product._id} className={styles.tr}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        src={product.img}
                        layout="fill"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras.map((extra) => (
                        <span key={extra._id}>{` +${extra.text}`}</span>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.total}>
                      ${product.price * product.quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {ready === "open" && (
          <div className={styles.inputData}>
            <div className={styles.inputDataWrapper}>
              <input
                className={styles.input}
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="phone Number"
              />
              <button className={styles.inbutton} onClick={createOrder}>
                Pay On Delievery!
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$
            {`${cart.total}.00`}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${`${cart.total}.00`}
          </div>
          {ready === "closed" && (
            <button className={styles.button} onClick={() => setReady("open")}>
              PLACE ORDER!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
