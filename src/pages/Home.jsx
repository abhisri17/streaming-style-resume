import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

// Keep Row and Modal placeholders for now
const Row = ({ section, openModal }) => (
  <div style={{ padding: '2rem', borderBottom: '1px solid #333' }} data-section>
    <h2>{section.title}</h2>
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
      {section.items.map((item) => (
        <div
          key={item.id}
          onClick={() => openModal(item)}
          style={{
            minWidth: '300px',
            height: '180px',
            background: '#444',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '1rem',
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>
      ))}
    </div>
  </div>
);

const Modal = ({ item, isOpen, closeModal }) => {
  if (!isOpen || !item) return null;
  return (
    <div
      onClick={closeModal}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#222', padding: '2rem', borderRadius: '8px', maxWidth: '600px' }}
      >
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const PageContainer = styled.div`
  width: 100%;
`;

const RowsContainer = styled.div`
  padding-bottom: 4rem;
`;

function Home({ profile, sections, selectedItem, isModalOpen, openModal, closeModal }) {
  return (
    <PageContainer>
      <Navbar profile={profile} />
      
      <Banner profile={profile} />

      <RowsContainer>
        {sections.map((section) => (
          <Row key={section.id} section={section} openModal={openModal} />
        ))}
      </RowsContainer>

      <Modal item={selectedItem} isOpen={isModalOpen} closeModal={closeModal} />
    </PageContainer>
  );
}

export default Home;
