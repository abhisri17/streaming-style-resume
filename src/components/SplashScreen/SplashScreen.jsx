import React, { useState, useEffect, useRef } from 'react';
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

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleUp = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px rgba(229, 9, 20, 0.5),
                 0 0 20px rgba(229, 9, 20, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(229, 9, 20, 0.8),
                 0 0 40px rgba(229, 9, 20, 0.5),
                 0 0 60px rgba(229, 9, 20, 0.3);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.7;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px);
  }
`;

// Styled Components
const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${({ $isExiting }) => ($isExiting ? fadeOut : fadeIn)} 0.5s ease-out;
  animation-fill-mode: forwards;
  cursor: ${({ $hasStarted }) => ($hasStarted ? 'default' : 'pointer')};
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  animation: ${scaleUp} 1s ease-out;
`;

const LogoText = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  letter-spacing: -2px;
  animation: ${glow} 2s ease-in-out infinite;
  font-family: 'Bebas Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 4.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  font-weight: 300;
  letter-spacing: 2px;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out 0.5s forwards;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  opacity: ${({ $show }) => ($show ? '1' : '0')};
  transition: opacity 0.3s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 150px;
  }
`;

const LoadingProgress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  width: ${({ $progress }) => $progress}%;
  transition: width 0.3s ease-out;
`;

const ClickPrompt = styled.div`
  position: absolute;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  opacity: ${({ $show }) => ($show ? '1' : '0')};
  pointer-events: none;
  animation: ${({ $show }) => ($show ? pulse : 'none')} 2s ease-in-out infinite;
  transition: opacity 0.3s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 2rem;
  }
`;

const PromptText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  letter-spacing: 2px;
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const SoundIcon = styled.div`
  font-size: 2.5rem;
`;

const SkipButton = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.textMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  opacity: ${({ $show }) => ($show ? '1' : '0')};
  pointer-events: ${({ $show }) => ($show ? 'all' : 'none')};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 2rem;
    right: 2rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

// Main Component
function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const handleScreenClick = () => {
    // Only start if not already started
    if (hasStarted) {
      // If already playing, allow skip if enabled
      if (canSkip) {
        handleExit();
      }
      return;
    }

    // Start the experience
    setHasStarted(true);
    // console.log('🎬 User clicked - starting experience...');
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      
      audioRef.current.play()
        // .then(() => {
        //   console.log('✅ Audio playing successfully!');
        // })
        // .catch((error) => {
        //   console.error('❌ Audio failed:', error);
        // });
    }

    // Start progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current);
          return 100;
        }
        return prev + 3.33; // 100% in 3 seconds
      });
    }, 100);

    // Allow skipping after 1 second
    setTimeout(() => {
      setCanSkip(true);
    }, 1000);

    // Auto-exit after 3 seconds
    setTimeout(() => {
      handleExit();
    }, 3000);
  };

  const handleExit = () => {
    setIsExiting(true);
    
    // Stop progress interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Fade out audio
    if (audioRef.current && !audioRef.current.paused) {
      const fadeAudio = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.1;
        } else {
          clearInterval(fadeAudio);
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }
      }, 50);
    }
    
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Cleanup effect - FIXED VERSION
  useEffect(() => {
    // Capture the current ref values at mount time
    const audio = audioRef.current;
    const progressInterval = progressIntervalRef.current;

    // Return cleanup function using captured values
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <SplashContainer 
      $isExiting={isExiting} 
      $hasStarted={hasStarted}
      onClick={handleScreenClick}
    >
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/intro-sound.mp3" type="audio/mpeg" />
      </audio>

      <LogoWrapper>
        <LogoText>AS</LogoText>
        <Subtitle>PORTFOLIO</Subtitle>
        <LoadingBar $show={hasStarted}>
          <LoadingProgress $progress={progress} />
        </LoadingBar>
      </LogoWrapper>

      {/* Show "Click to Continue" before starting */}
      <ClickPrompt $show={!hasStarted}>
        <SoundIcon>🔊</SoundIcon>
        <PromptText>Click to Continue</PromptText>
      </ClickPrompt>

      {/* Show "Skip Intro" after starting */}
      <SkipButton 
        $show={hasStarted && canSkip}
        onClick={(e) => {
          e.stopPropagation();
          handleExit();
        }}
      >
        SKIP INTRO
      </SkipButton>
    </SplashContainer>
  );
}

export default SplashScreen;
