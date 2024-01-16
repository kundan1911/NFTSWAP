import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import Card from "./Card";

// function convertToBase16(number) {
//   return number.toString(16);
// }

const getid=async (cnt,setChainId,type)=>{
  const cid=await cnt.getChainId();
  const res="0x"+cid.toString(16);

  console.log(res)
  // setChainId(res)  
  if(type===2 || type===3)
setChainId(((prevData) => ({ ...prevData, "chain" :res})))
  return res
}
export default function GetNfts(props) {
  const [nfts, setNfts] = useState([]);
  const [selectNft, setSelectedNFT] = useState(0);
  const [chain, setChain] = useState(); // Initialize chain state

  var route;
  var { address, connector, isConnected } = useAccount();
  if (props.loadCounterNFt === true) {
    address = props.address;
    route = "http://localhost:5001/getContractNFTs";
  } else {
    route = "http://localhost:5001/getnfts";

    if (props.counterAddr === 2) {
      address = props.address;
     
    }
  }
  console.log("prosp")
  console.log(props)
  useEffect(() => {
    // Define an asynchronous function within the useEffect
    async function fetchData() {
      if(isConnected){
      const chainResult = await getid(connector,props.setFormData,props.type);
      setChain(chainResult); // Set the chain state with the result of getid

      console.log("before axios")
      // Make axios request with the updated chain value
      // 
      const response = await axios.get(route, {
        params: { address, chain: chainResult }, // Use the updated chain value here
      });

      setNfts(response.data.result);
      console.log(response);
     
    }
    }

    fetchData(); // Call the async function
    // props.setChainId(((prevData) => ({ ...prevData, "chain" :chain})))
  }, []); // Add dependencies to the dependency array

  const handleSelectNFT = (name, image) => {
    setSelectedNFT({ name, image });
  };

  return (
    <>
      {nfts.map((nft) => {
        return (
          <Card
            uri={nft}
            key={nft.token_uri}
            onSelectNFT={handleSelectNFT}
            setFormData={props.setFormData}
            type={props.type}
          />
        );
      })}
    </>
  );
}
