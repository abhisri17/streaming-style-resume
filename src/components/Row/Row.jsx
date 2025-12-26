import React, { useRef, useState } from 'react';
import styled from 'styled-components';

// Styled Components
const RowContainer = styled.div`
  padding: 2rem 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem 0;
  }
`;

const RowHeader = styled.div`
  padding: 0 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const RowTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.35rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const ItemCount = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 400;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  padding: 1rem 3rem;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1rem 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem 1.5rem;
    overflow: visible;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    overflow-x: visible;
    gap: 1rem;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

// Placeholder Card styled component (will be replaced with real Card component in Step 8)
const PlaceholderCard = styled.div`
  min-width: 320px;
  max-width: 320px;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.layout.borderRadius};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 100%;
    max-width: 100%;
    height: 160px;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

const CardContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(229, 9, 20, 0.15);
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  border: 1px solid rgba(229, 9, 20, 0.3);
`;

// Icons
const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

// Main Component
function Row({ section, openModal }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Handle scroll position to show/hide arrows
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <RowContainer data-section>
      <RowHeader>
        <RowTitle>{section.title}</RowTitle>
        <ItemCount>{section.items.length} items</ItemCount>
      </RowHeader>

      <ScrollContainer>
        <ScrollButton direction="left" visible={showLeftArrow} onClick={scrollLeft}>
          <IconChevronLeft />
        </ScrollButton>

        <CardsWrapper ref={scrollRef} onScroll={handleScroll}>
          {section.items.map((item) => (
            <PlaceholderCard key={item.id} onClick={() => openModal(item)}>
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardSubtitle>{item.subtitle}</CardSubtitle>
                <CardTags>
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </CardTags>
              </CardContent>
            </PlaceholderCard>
          ))}
        </CardsWrapper>

        <ScrollButton direction="right" visible={showRightArrow} onClick={scrollRight}>
          <IconChevronRight />
        </ScrollButton>
      </ScrollContainer>
    </RowContainer>
  );
}

export default Row;
