import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { MNain } from './Pages/Main';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MNain/>} />
      </Routes>
    </Router>
  );
}

export default App;
