import React from 'react';
import styled from 'styled-components';

const AppShell = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

function App() {
  return (
    <AppShell>
      <main>
        <Title>Streaming Resume – Step 1 Complete ✅</Title>
      </main>
    </AppShell>
  );
}

export default App;
