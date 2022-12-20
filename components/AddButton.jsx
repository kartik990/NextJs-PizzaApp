import React from "react";
import styles from "./../styles/AddModel.module.css";

export default function AddButton({ setClose }) {
  return (
    <div onClick={() => setClose(false)} className={styles.mainButton}>
      Add new Pizza
    </div>
  );
}
