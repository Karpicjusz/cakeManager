import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ConfiguratorPage from './pages/ConfiguratorPage';

function App() {
  return (
    // The main element should ideally not be directly under a fragment if it's the only child of the fragment.
    // However, given the existing structure, we'll keep it as is.
    // A better approach for the root would be:
    // <BrowserRouter>
    //   <Navbar />
    //   <main>...</main>
    // </BrowserRouter>
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/configure-cake" element={<ConfiguratorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;