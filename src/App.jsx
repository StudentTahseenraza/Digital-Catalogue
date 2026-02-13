import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Certificates from './pages/Certificates';
import Services from './pages/Services';
import Contact from './pages/Contact';
import CombinedPage from './pages/CombinedPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<CombinedPage/>} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <LiveChat />
      </div>
    </Router>
  );
}

export default App;