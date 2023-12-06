import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

import styles from "../styles/Home.module.css";
import Card from "./Card";

export default function GetNfts(props) {  
  const [nfts, setNfts] = useState([]);
  const [selectNft,setSelectedNFT]=useState(0);
console.log(props.address)

  var route;
  var { address,isConnected } = useAccount();
  if(props.loadCounterNFt===true){
  address=props.address
 route="https://nftbackend-2p4r.onrender.com/getContractNFTs"
  }
  else{
    // console.log("Innn")
  route="https://nftbackend-2p4r.onrender.com/getnfts"

  console.log("direcr")
  console.log(isConnected)
  if(props.counterAddr===2){
    
    address=props.address
  }
  // address="0x9d305a42a3975ee4c1c57555bed5919889dce63f"

  }
  const chain = "0x89";
// 
  useEffect(() => {
    let response;
    async function getData() {
      response = await axios
        .get(route, {
          params: { address, chain },
        })
        .then((response) => {
          setNfts(response.data.result);
          console.log(response);
        });
    }
    getData();
  }, []);
  const handleSelectNFT = (name, image) => {
    setSelectedNFT({ name, image });
  };

  return (
    // <section className={styles.dataContainer}>
    // return nft.metadata && <Card uri={nft} key={nft.token_uri}  onSelectNFT={handleSelectNFT} setFormData={props.setFormData} type={props.type} />;
    <>
      {nfts.map((nft) => {
        return  <Card uri={nft} key={nft.token_uri}  onSelectNFT={handleSelectNFT} setFormData={props.setFormData} type={props.type} />;
      })}
    </>
    // </section>
  );
}
