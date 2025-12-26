import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Modal from '../components/Modal';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const PageContainer = styled.div`
  width: 100%;
`;

const RowsContainer = styled.div`
  padding-bottom: 4rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

function Home({ profile, sections, selectedItem, isModalOpen, openModal, closeModal }) {
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

      <Footer profile={profile} />
      <ScrollToTop />

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
