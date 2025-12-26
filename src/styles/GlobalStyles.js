import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    margin: 0;
    padding: 0;
    height: 100%;
    scroll-behavior: smooth;
  }

  body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.baseFontSize};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    overscroll-behavior-y: none;
    touch-action: manipulation;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #000;
  }

  ::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
  }
`;
