import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Modal from '../components/Modal';

const PageContainer = styled.div`
  width: 100%;
`;

const RowsContainer = styled.div`
  padding-bottom: 4rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

function Home({ profile, sections, selectedItem, isModalOpen, openModal, closeModal }) {
  // Find the section type of the selected item
  const getSectionType = () => {
    if (!selectedItem) return null;
    const section = sections.find((s) => s.items.some((item) => item.id === selectedItem.id));
    return section ? section.type : null;
  };

  return (
    <PageContainer>
      <Navbar profile={profile} />
      <Banner profile={profile} />

      <RowsContainer>
        {sections.map((section) => (
          <Row key={section.id} section={section} openModal={openModal} />
        ))}
      </RowsContainer>

      {/* Real Modal Component */}
      <Modal
        item={selectedItem}
        isOpen={isModalOpen}
        closeModal={closeModal}
        sectionType={getSectionType()}
      />
    </PageContainer>
  );
}

export default Home;
