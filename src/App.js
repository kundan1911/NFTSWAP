import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { MNain } from './Pages/Main';
import Multistep from './Pages/MultiStepForm';
import MarketPlace from './Pages/MarketPlace';
import RoadMap from './Pages/RoadMap';
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";


function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MNain/>} />
        <Route exact path="/RoadMap" element={<RoadMap/>}/>
        <Route exact path="/create-post" element={<Multistep/>}/>
        <Route exact path="/MarketPlace" element={<MarketPlace connect={connect} isConnected={isConnected} address={address} />}/>
      </Routes>
    </Router>
  );
}

export default App;
