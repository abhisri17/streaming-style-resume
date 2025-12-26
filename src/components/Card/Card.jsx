import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const CardContainer = styled.div`
  min-width: 320px;
  max-width: 320px;
  height: 180px;
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.card};
  background-color: ${({ theme }) => theme.colors.surface};

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.9);
    z-index: 10;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 100%;
    max-width: 100%;
    height: 200px;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ${({ theme }) => theme.transitions.slow};

  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${CardContainer}:hover & {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0.95) 100%
    );
  }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.05rem;
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const CardTags = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(10px);
  transition: all ${({ theme }) => theme.transitions.normal};

  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Tag = styled.span`
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(229, 9, 20, 0.2);
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  border: 1px solid rgba(229, 9, 20, 0.4);
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const TypeBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surfaceElevated} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 3rem;
`;

// Main Component
function Card({ item, sectionType, onClick }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <CardContainer onClick={() => onClick(item)}>
      {!imageError ? (
        <>
          {!imageLoaded && (
            <ImagePlaceholder>
              {sectionType === 'experience' && '💼'}
              {sectionType === 'project' && '🚀'}
              {sectionType === 'skill' && '⚡'}
              {sectionType === 'education' && '🎓'}
            </ImagePlaceholder>
          )}
          <CardImage
            src={item.image}
            alt={item.title}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
            loading="lazy"
          />
        </>
      ) : (
        <ImagePlaceholder>
          {sectionType === 'experience' && '💼'}
          {sectionType === 'project' && '🚀'}
          {sectionType === 'skill' && '⚡'}
          {sectionType === 'education' && '🎓'}
        </ImagePlaceholder>
      )}

      <TypeBadge $type={sectionType}>{sectionType}</TypeBadge>

      <CardOverlay>
        <CardTitle>{item.title}</CardTitle>
        <CardSubtitle>{item.subtitle}</CardSubtitle>
        <CardTags>
          {item.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </CardTags>
      </CardOverlay>
    </CardContainer>
  );
}

export default Card;
