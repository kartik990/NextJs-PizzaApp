import Image from "next/image";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const NavBar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image width={32} height={32} src="/img/telephone.png" alt="" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Order Now!!</div>
          <div className={styles.text}>012 345 6789</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href="/" passHref>
            <li className={styles.listItem}>Products</li>
          </Link>
          <Link href="/" passHref>
            <li className={styles.listItem}>Menu</li>
          </Link>
          <Link href="/" passHref>
            <Image
              className={styles.logo}
              src="/img/logo.png"
              alt=""
              width="130"
              height="80"
            />
          </Link>
          <Link href="/admin" passHref>
            <li className={styles.listItem}>Admin</li>
          </Link>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart" passHref>
          <div className={styles.cart}>
            <Image src="/img/cart.png" width="30" height="30" alt="" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
