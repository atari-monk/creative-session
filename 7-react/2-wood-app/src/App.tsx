import React, { useEffect, useState } from 'react';
import { StyledAppContainer, setDarkMode } from './styles';
import StockManagementComponent from './components/StockManagementComponent';

//deploy
const App: React.FC = () => {
  const [darkMode, setDarkModeState] = useState<boolean>(true);

  useEffect(() => {
    setDarkMode(darkMode);
    return () => setDarkMode(false);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    setDarkMode(newDarkMode);
  };

  return (
    <StyledAppContainer className={`App`}>
      <h1>Wood Stock Manager</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <StockManagementComponent />
    </StyledAppContainer>
  );
};

export default App;
