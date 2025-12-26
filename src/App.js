import React, { useState } from 'react';
import styled from 'styled-components';
import Home from './pages/Home';
import resumeData from './data/resume.json';

const AppShell = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow-x: hidden;
`;

function App() {
  // Modal state management
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected card data
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Delay to allow exit animation
  };

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
