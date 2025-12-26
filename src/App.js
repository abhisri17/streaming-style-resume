import React, { useState } from 'react';
import styled from 'styled-components';
import Home from './pages/Home';
import SplashScreen from './components/SplashScreen';
import resumeData from './data/resume.json';

const AppShell = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow-x: hidden;
`;

function App() {
  // Always show splash on mount - removed sessionStorage check
  const [showSplash, setShowSplash] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Removed sessionStorage.setItem - splash will show every time
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Show splash screen on every load
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <AppShell>
      <Home
        profile={resumeData.profile}
        sections={resumeData.sections}
        selectedItem={selectedItem}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </AppShell>
  );
}

export default App;
