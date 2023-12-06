import React from 'react';
import styles from "../styles/Home.module.css";

const OnlyCard =(props) => {
  return (
    <section className={styles.cardContainer}>
      <div  >
      <h1>{props.name}</h1> 
    <img src={props.Image} /> 
      </div>
    </section>
  )
}

export default OnlyCard;