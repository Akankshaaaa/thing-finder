import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import AddItem from './pages/AddItem';
import Gallery from './pages/Gallery';
import Search from './pages/Search';
import Home from './pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue/20 via-pastel-lavender/20 to-pastel-pink/20">
          <div className="fixed inset-0 bg-pattern opacity-5 pointer-events-none"></div>
          <Navbar />
          <main className="container mx-auto py-8 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddItem />} />
              <Route path="/search" element={<Search />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 