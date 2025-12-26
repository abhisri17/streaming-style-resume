import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem;
    align-items: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  max-width: 850px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.modal};
  animation: ${slideUp} 0.4s ease-out;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-height: 85vh;
    margin: 2rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 0;
    max-height: 100vh;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(
      180deg,
      rgba(24, 24, 24, 0.2) 0%,
      rgba(24, 24, 24, 0.8) 70%,
      ${({ theme }) => theme.colors.surface} 100%
    ),
    url(${({ $bgImage }) => $bgImage});
  background-size: cover;
  background-position: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 250px;
  }
`;

const ContentSection = styled.div`
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.25rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const DateBadge = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

const TypeBadge = styled.span`
  background-color: ${({ $type, theme }) => {
    switch ($type) {
      case 'experience':
        return 'rgba(76, 175, 80, 0.2)';
      case 'project':
        return 'rgba(229, 9, 20, 0.2)';
      case 'skill':
        return 'rgba(33, 150, 243, 0.2)';
      case 'education':
        return 'rgba(255, 152, 0, 0.2)';
      default:
        return theme.colors.surface;
    }
  }};
  color: ${({ $type, theme }) => {
    switch ($type) {
      case 'experience':
        return '#4CAF50';
      case 'project':
        return theme.colors.primary;
      case 'skill':
        return '#2196F3';
      case 'education':
        return '#FF9800';
      default:
        return theme.colors.textMuted;
    }
  }};
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid
    ${({ $type, theme }) => {
      switch ($type) {
        case 'experience':
          return 'rgba(76, 175, 80, 0.3)';
        case 'project':
          return 'rgba(229, 9, 20, 0.3)';
        case 'skill':
          return 'rgba(33, 150, 243, 0.3)';
        case 'education':
          return 'rgba(255, 152, 0, 0.3)';
        default:
          return theme.colors.border;
      }
    }};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem 0;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};

  &::before {
    content: '▹';
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Tag = styled.span`
  background-color: rgba(229, 9, 20, 0.15);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(229, 9, 20, 0.3);
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: rgba(229, 9, 20, 0.25);
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
`;

// Icons
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

// Main Component
function Modal({ item, isOpen, closeModal, sectionType }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !item) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal} aria-label="Close modal">
          <IconClose />
        </CloseButton>

        <HeroSection $bgImage={item.image} />

        <ContentSection>
          <Title>{item.title}</Title>
          <Subtitle>{item.subtitle}</Subtitle>

          <MetaInfo>
            {item.date && <DateBadge>📅 {item.date}</DateBadge>}
            {sectionType && <TypeBadge $type={sectionType}>{sectionType}</TypeBadge>}
          </MetaInfo>

          <Description>{item.description}</Description>

          {item.highlights && item.highlights.length > 0 && (
            <Section>
              <SectionTitle>Key Highlights</SectionTitle>
              <HighlightsList>
                {item.highlights.map((highlight, index) => (
                  <HighlightItem key={index}>{highlight}</HighlightItem>
                ))}
              </HighlightsList>
            </Section>
          )}

          {item.tags && item.tags.length > 0 && (
            <Section>
              <SectionTitle>Technologies & Skills</SectionTitle>
              <TagsContainer>
                {item.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            </Section>
          )}
        </ContentSection>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal;
