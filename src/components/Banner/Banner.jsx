import React from 'react';
import styled, { keyframes } from 'styled-components';
import heroImage from "../../assets/images/hero_image_1.jpg";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  background: linear-gradient(
      180deg,
      rgba(20, 20, 20, 0.1) 0%,
      rgba(20, 20, 20, 0.7) 50%,
      rgba(20, 20, 20, 0.95) 100%
    ),
    url(${({ $bgImage }) => $bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: ${({ theme }) => theme.layout.navbarHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 70vh;
    min-height: 450px;
    margin-top: 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 65vh;
    min-height: 400px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3rem;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
  }
`;

const BannerContent = styled.div`
  max-width: 850px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

const Name = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  letter-spacing: -1px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.25rem;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 500;
  margin: 0 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const Summary = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2rem 0;
  max-width: 750px;
  font-weight: 400;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.75rem;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0.65rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(229, 9, 20, 0.5);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: rgba(109, 109, 110, 0.7);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: rgba(109, 109, 110, 0.4);
    transform: scale(1.05);
  }
`;

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
`;

const FadeBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(20, 20, 20, 0.5) 50%,
    ${({ theme }) => theme.colors.background} 100%
  );
  pointer-events: none;
`;

// Simple icon components
const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const IconInfo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// Main Component
function Banner({ profile }) {
  const handleViewWork = () => {
    // Scroll to first section (projects or experience)
    const firstSection = document.querySelector('[data-section]');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BannerContainer $bgImage={heroImage}>
      <ContentWrapper>
        <BannerContent>
          <LocationBadge>
            <IconLocation />
            {profile.location}
          </LocationBadge>

          <Name>{profile.name}</Name>
          <Title>{profile.title}</Title>
          <Summary>{profile.summary}</Summary>

          <ButtonGroup>
            <PrimaryButton onClick={handleViewWork}>
              <IconPlay />
              View My Work
            </PrimaryButton>
            <SecondaryButton href={`mailto:${profile.email}`}>
              <IconInfo />
              Contact Me
            </SecondaryButton>
          </ButtonGroup>
        </BannerContent>
      </ContentWrapper>

      <FadeBottom />
    </BannerContainer>
  );
}

export default Banner;
