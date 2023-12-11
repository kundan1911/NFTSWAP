import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Card(props) {
  const [nft, setNft] = useState(JSON.parse(props.uri.metadata));

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [nftImage, setNftImage] = useState(() => {
    if (nft?.image) {
      // console.log(nft.image.includes("ipfs"))
      if (nft.image.startsWith("https://")) {
        // If the URL starts with "https://", keep it as it is
        return nft.image;}
        else if (nft.image.startsWith("ipfs://")) {
          // If the URL starts with "ipfs://", transform it
          const ipfsPath = nft.image.split("ipfs://")[1];
          return `https://ipfs.io/ipfs/${ipfsPath}`;
        } else {
          // Handle other cases if needed
          return nft.image;
        }

      //
      //   ? `https://ipfs.io/ipfs/${nft.image.split("ipfs://")[1]}`
      //   : nft.image
    }
  });
  const handleNFTClick=(name,img)=>{
    setSelectedNFT(name)
    if(props.type===2){
    props.setFormData(((prevData) => ({ ...prevData, "frm2" :{
      name,
      nftImage:img
    }})))
  }
  else if(props.type===3){
    props.setFormData({
      name,
      nftImage:img,
      tokenId:props.uri.token_id,
      contractAddr:props.uri.token_address,
      type:props.uri.contract_type
    })
    // console.log()
  }
  else{
    props.setFormData(((prevData) => ({ ...prevData, "frm3" :{
      name,
      nftImage:img
    }})))
  }
  }

  return (
    <section className={styles.cardContainer}>
      <div  key={nft?.name} className={`${selectedNFT === nft ? styles.selectedCard : ''}`} onClick={() => handleNFTClick(nft?.name, nftImage) } >
      {nft?.name ? <h1>{nft.name}</h1> : <h1>No NFT title can be shown.</h1>}
      {nftImage ? <img src={nftImage} /> : <p>No NFT image can be shown.</p>}
      </div>
    </section>
  );
}