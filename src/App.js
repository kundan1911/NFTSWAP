import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { MNain } from './Pages/Main';
import Multistep from './Components/MultiStepForm';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MNain/>} />
        <Route exact path="/create-post" element={<Multistep/>}/>
      </Routes>
    </Router>
  );
}

export default App;
