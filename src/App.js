import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { MNain } from './Pages/Main';
import Multistep from './Pages/MultiStepForm';
import MarketPlace from './Pages/MarketPlace';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MNain/>} />
        <Route exact path="/create-post" element={<Multistep/>}/>
        <Route exact path="/MarketPlace" element={<MarketPlace/>}/>
      </Routes>
    </Router>
  );
}

export default App;
