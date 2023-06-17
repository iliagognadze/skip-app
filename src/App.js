import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Catalog from './components/Catalog';
import OrderingSection from './components/OrderingSection';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App overflow-x-hidden bg-primary">
        <Navbar />

        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/ordering' element={<OrderingSection />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}


export default App;
