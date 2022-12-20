import styles from "../styles/Featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <div className={styles.offer}>
            <div className={styles.subtitle}>HOT & SPICY</div>
            <div className={styles.title}>PIZZA</div>

            <div className={styles.five}> 50 % off</div>
            <div className={styles.or}>Order Now</div>
          </div>
          <Image
            className={styles.pizzaImg}
            src="/img/pizza1.png"
            alt=""
            width="400"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
