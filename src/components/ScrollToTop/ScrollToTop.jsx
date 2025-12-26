import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: 0 4px 16px rgba(229, 9, 20, 0.4);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.6);
  }

  &:active {
    transform: translateY(-1px);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
  }
`;

// Icon
const IconArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </svg>
);

// Main Component
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton visible={visible} onClick={scrollToTop} aria-label="Scroll to top">
      <IconArrowUp />
    </ScrollButton>
  );
}

export default ScrollToTop;
