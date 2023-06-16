import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App overflow-x-hidden">
        <Navbar />
      </div>
    </Router>
  );
}


export default App;
