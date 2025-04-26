import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Illustrations from './components/Illustrations';
import About from './components/About';
import Contact from './components/Contact';
import Youtube from './components/Youtube';
import Posts from './components/Posts';
import Support from './components/Support';

function App() {
  return (
    <Router>
     
        <Header />
        
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact  />} />
            <Route path="/illustration" element={<Illustrations  />} />
            <Route path="/post" element={<Posts/>} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path='/support' element={<Support/>} />
          
          </Routes>
      
        
        <Footer />
     
    </Router>
  );
}

export default App;