import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${({ theme }) => theme.layout.navbarHeight};
  z-index: 100;
  transition: background-color ${({ theme }) => theme.transitions.normal};
  background-color: ${({ scrolled }) => (scrolled ? 'rgba(20, 20, 20, 0.95)' : 'transparent')};
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(10px)' : 'none')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 60px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 3rem;
  max-width: 1920px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  letter-spacing: -0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ mobileMenuOpen }) => (mobileMenuOpen ? 'flex' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(20, 20, 20, 0.98);
    backdrop-filter: blur(10px);
    padding: 2rem;
    gap: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

// const NavLink = styled.a`
//   color: ${({ theme }) => theme.colors.text};
//   font-size: 0.95rem;
//   font-weight: 500;
//   text-decoration: none;
//   transition: color ${({ theme }) => theme.transitions.fast};
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:hover {
//     color: ${({ theme }) => theme.colors.primary};
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     font-size: 1rem;
//   }
// `;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 1rem;
  }
`;

const SocialIcon = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-2px);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.text};
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  &::before {
    top: -7px;
  }

  &::after {
    top: 7px;
  }

  ${({ open }) =>
    open &&
    `
    background-color: transparent;
    &::before {
      transform: rotate(45deg);
      top: 0;
    }
    &::after {
      transform: rotate(-45deg);
      top: 0;
    }
  `}
`;

const ContactButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    text-align: center;
  }
`;

// Simple icon components (no external dependencies)
const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Main Component
function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo onClick={scrollToTop}>
          <LogoText>{profile.name.split(' ')[0]}</LogoText>
        </Logo>

        <NavLinks mobileMenuOpen={mobileMenuOpen}>
          <SocialLinks>
            {profile.social.map((social) => (
              <SocialIcon
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.platform}
                onClick={handleLinkClick}
              >
                {social.platform === 'LinkedIn' && <IconLinkedIn />}
                {social.platform === 'GitHub' && <IconGitHub />}
              </SocialIcon>
            ))}
          </SocialLinks>

          <ContactButton href={`mailto:${profile.email}`} onClick={handleLinkClick}>
            Get In Touch
          </ContactButton>
        </NavLinks>

        <HamburgerButton onClick={toggleMobileMenu} aria-label="Toggle menu">
          <HamburgerIcon open={mobileMenuOpen} />
        </HamburgerButton>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
