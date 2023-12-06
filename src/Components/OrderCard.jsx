import React from 'react';
import styles from "../styles/Home.module.css";

const OrderCard =({ ID, clickCard,takerAddr,makerAddr}) => {
    const takerSign=()=>{
console.log(ID)
clickCard(ID)
    }
  return (
    <section className={styles.cardContainer}>
      <div  onClick={() => takerSign()}>
      <h1>Order Id = {ID}</h1>
      <h1>Taker Address = {takerAddr}</h1> 
      <h1>Maker Address = {makerAddr}</h1>  
      </div>
    </section>
  )
}

export default OrderCard;